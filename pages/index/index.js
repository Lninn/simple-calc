//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 历史操作记录
    operations: [],
    // 前一次操作的类型
    frontOpType: util.opType.Number,
    frontOp: null,
    hasDot: false,
    // 显示操作过程
    showText: '',
    result: 0,
    keyboards: [
      'CE', 'C', 'X', '/',
      '7', '8', '9', '*',
      '4', '5', '6', '-',
      '1', '2', '3', '+',
      '-+', '.', '0', '='
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onClick: function (event) {
    const k = event.target.dataset.key
    if (k === undefined) {
      return
    } 

    this.check(k)
  },
  check: function(key) {
    if ('.0123456789'.includes(key)) {
      this.setNum(key)
    } else if (key == 'C') {
      this.setData({ showText: '' })
    } else if (key == 'X') {
      util.log('后退一步')
    } else if ('+-*/'.includes(key)) {
      this.calc(key)
    }else if (key == '=') {
      this.equal()
    } else if (key == 'CE') {
      util.log('清除错误')
    } else if (key == '-+') {
      util.log('取相反数')
    }

    util.log('check ', key, this.data.operations)
  },
  setNum(key) {
    if (key == '.') {
      // 小数点
      if (this.data.frontOpType == util.opType.Number && !this.data.hasDot) {
        const op = this.data.result
        this.setData({ result: `${op}${key}` })

        // 记录当前操作类型
        this.setData({ frontOpType: util.opType.Dot, })
      }
    } else {
      // 数字
      if (this.data.frontOpType == util.opType.Number || this.data.frontOpType == util.opType.Equal) {
        if (this.data.frontOpType == util.opType.Equal) {
          this.setData({ result: `${key}`, })
        } else {
          const op = this.data.result
          const t = Number(`${op}${key}`)
          this.setData({ result: t, })
        }
      } else {
        const ops = this.data.operations
        ops.push(this.data.frontOp)
        this.setData({ operations: ops, })
        this.setData({ result: `${key}`, })
      }

      // 记录当前操作类型
      this.setData({ frontOpType: util.opType.Number, })
    }
  },
  calc(key) {
    if (this.data.operations.length == 2) {
      let result = this.getResult()

      this.setData({ showText: `${this.data.showText}${this.data.result}`, })
      this.setData({ result: `${result}`, })
      this.setData({ operations: [result], })
      this.setData({ showText: `${this.data.showText}${key}`, })
    } else {
      if (this.data.frontOpType == util.opType.Number) {
        const ops = this.data.operations
        ops.push(this.data.result)
        this.setData({ operations: ops, })

        this.setData({ frontOp: `${key}` })
        this.setData({ showText: `${this.data.result}${key}`, })
      }
    }

    this.setData({ frontOp: key, })
    // 记录当前操作类型
    this.setData({ frontOpType: util.opType.NotNumber, })
  },
  equal() {
    if (this.data.operations.length == 2 && this.data.frontOpType == util.opType.Number) {
      let result = this.getResult()

      this.setData({ showText:'', })
      this.setData({ result: `${result}`, })
      this.setData({ operations: [], })
      this.setData({ frontOpType: util.opType.Equal, })
    }
  },
  getResult() {
    let result = 0
    const ops = this.data.operations

    if (ops[1] == '+') {
      result = Number(ops[0]) + Number(this.data.result)
    } else if (ops[1] == '-') {
      result = Number(ops[0]) - Number(this.data.result)
    } else if (ops[1] == '*') {
      result = Number(ops[0]) * Number(this.data.result)
    } else if (ops[1] == '/') {
      result = Number(ops[0]) / Number(this.data.result)
    }

    util.log('calc result ', result)
    return result
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
