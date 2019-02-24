// pages/calc/calc.js
const Calculator = require('calculator.js')
const log = console.log.bind(console)

Page({
  data: {
    calculator: null,
    showText: '',
    records: [],
    result: 0,
    keyboards: [
      'CE', 'AC', 'X', 'H',
      '7', '8', '9', '/',
      '4', '5', '6', '*',
      '1', '2', '3', '-',
      '.', '0', '=', '+'
    ],
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
    const calculator = this.data.calculator

    this.setData({
      result: calculator.result,
      showText: calculator.showText,
    })

    if (name == 'equal') {
      this.setData({
        records: calculator.records,
      })
      // 将历史记录保存到本地
      wx.setStorageSync('records', calculator.records)
    }
  },

  onReady: function() {
    // 初始化计算器
    const calculator = Calculator.instance()
    this.setData({ calculator, })
  },
})