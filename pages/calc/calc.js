// pages/calc/calc.js
const Calculator = require('calculator.js')
const log = console.log.bind(console)

Page({
  data: {
    calculator: null,
    expression: '',
    result: 0,
    keyboards: [
      'CE', 'AC', 'X', '/',
      '7', '8', '9', '*',
      '4', '5', '6', '-',
      '1', '2', '3', '+',
      '.', '0', 'H', '='
    ],
    recordName: 'RECORDS',
    currentRecord: 'CURRENT_RECORD',
  },

  onClick: function (event) {
    const k = event.target.dataset.key
    if (k === undefined) {
      return
    } else {
      this.handleKey(k)
    }
  },

  handleKey: function(key) {
    const o = Calculator.keyMap(key)
    const { calculator, } = this.data

    if (o.name == 'history') {
      wx.navigateTo({
        url: '../history/history',
      })
    } else {
      calculator.execute(o)
      this.showData(o.name)
    }
  },

  showData: function(name) {
    // 渲染数据
    const { result, expression, records, } = this.data.calculator.getData()

    this.setData({ result, expression, })

    if (name == 'equal') {
      // 将历史记录保存到本地
      wx.setStorageSync(this.data.recordName, records)
    }
  },

  onLoad: function() {

    // 初始化计算器
    const { calculator, } = this.data

    if (!calculator) {
      const calculator = Calculator.instance()
      this.setData({ calculator, })
    }
  },

  onShow: function() {
    const record = wx.getStorageSync(this.data.currentRecord) || {}
    if (Object.keys(record).length > 0) {
      this.data.calculator.setData({
        expression: record.expression,
        result: record.result,
      })

      this.showData()
    }
  },

  onHide: function() {
    wx.setStorageSync(this.data.currentRecord, {})
  }
})