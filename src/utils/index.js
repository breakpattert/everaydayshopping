import store from '../store'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function getTimestamp() {
  return parseInt(new Date().getTime() / 1000)
}

function Format(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 经纬度转换成三角函数中度分表形式。
function Rad(d) {
  return d * Math.PI / 180.0
}

export default class Utils {
  static formatTime(date, str = '/') {
    date = new Date(parseInt(date))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // const hour = date.getHours()
    // const minute = date.getMinutes()
    // const second = date.getSeconds()
    const t1 = [year, month, day].map(formatNumber).join(str)
    // const t2 = [hour, minute, second].map(formatNumber).join(':')
    // console.log(`${t1} ${t2}`)
    return `${t1}`
  }
  static formatDate(date, form = 'yyyy-MM-dd HH:mm:ss') {
    date = new Date(parseInt(date) * 1000)
    const t1 = Format(date, form)
    return `${t1}`
  }
  static tabbarinit() {
    return [{
        'current': 0,
        pagePath: '/pages/home/home',
        text: '首页',
        iconPath: '/static/images/1.png',
        selectedIconPath: '/static/images/11.png'
      },
      {
        'current': 0,
        pagePath: '/pages/nearly/nearly',
        text: '附近',
        iconPath: '/static/images/2.png',
        selectedIconPath: '/static/images/22.png'
      },
      {
        'current': 0,
        pagePath: '/pages/community/community',
        text: '发现',
        iconPath: '/static/images/3.png',
        selectedIconPath: '/static/images/33.png'
      },
      {
        'current': 0,
        pagePath: '/pages/news/news',
        text: '消息',
        iconPath: '/static/images/4.png',
        selectedIconPath: '/static/images/44.png'
      },
      {
        'current': 0,
        pagePath: '/pages/user/user',
        text: '我的',
        iconPath: '/static/images/5.png',
        selectedIconPath: '/static/images/55.png'
      }
    ]
  }

  static PromiseAll(...restArgs) {
    return new Promise((resolve, reject) => {
      Promise.all(restArgs).then((results) => {
        resolve(results)
      })
    })
  }

  static deepCopy(source) {
    var result = {}
    for (var key in source) {
      if (typeof source[key] === 'object') {
        result[key] = this.deepCopy(source[key])
      } else {
        result[key] = source[key]
      }
    }
    return result
  }
  // 百度经纬度转腾讯经纬度
  static bMapTransqqMap(lng, lat) {
    let xPi = 3.14159265358979324 * 3000.0 / 180.0
    let x = lng - 0.0065
    let y = lat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi)
    let lngs = z * Math.cos(theta)
    let lats = z * Math.sin(theta)

    return [lngs, lats]
  }
  // 计算2个经纬度之间的距离  //输出为公里
  static getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = Rad(lat1)
    var radLat2 = Rad(lat2)
    var a = radLat1 - radLat2
    var b = Rad(lng1) - Rad(lng2)
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 // EARTH_RADIUS
    s = Math.round(s * 10000) / 10000
    return s
  }
  static stopRefresh(sropSelector = '#wux-refresher') {
    const getCtx = (
      selector,
      ctx = getCurrentPages()[getCurrentPages().length - 1]
    ) => {
      const componentCtx = ctx.selectComponent(selector)

      if (!componentCtx) {
        throw new Error('无法找到对应的组件，请按文档说明使用组件')
      }

      return componentCtx
    }
    const $stopWuxRefresher = (selector = sropSelector, ctx) =>
      getCtx(selector, ctx).finishPullToRefresh()
    $stopWuxRefresher()
    setTimeout(() => {
      store.commit('SET_REFRESH', true)
    }, 300)
    setTimeout(() => {
      store.commit('SET_REFRESH', false)
    }, 3000)
  }

  static getTimestamp() {
    return parseInt(new Date().getTime() / 1000)
  }

  static hasOverTime(i) {
    let hours = (getTimestamp() - i.createtime) / 3600
    if (hours < 1 / 60) {
      i.createtime = `刚刚`
    } else if (hours < 1) {
      i.createtime = `${parseInt(hours * 60)}分钟前`
    } else if (hours < 24) {
      i.createtime = `${parseInt(hours)}小时前`
    } else if (hours < 24 * 7) {
      i.createtime = `${parseInt(hours / 24)}天前`
    } else if (hours < 24 * 7 * 30) {
      i.createtime = `${parseInt(hours / (24 * 7))}周前`
    } else if (hours < 24 * 7 * 30 * 365) {
      i.createtime = `${parseInt(hours / (24 * 7 * 30))}月前`
    } else {
      i.createtime = `${parseInt(hours / (24 * 7 * 30 * 365))}年前`
    }
  }
  static uniqueArrObj(arr, type) {
    if (arr.length == 0) {
      return arr
    } else {
      if (type) {
        var obj = {}
        var newArr = arr.reduce((cur, next) => {
          obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
          return cur
        }, [])
        return newArr
      } else {
        return Array.from(new Set(arr));
      }
    }
  }

}
