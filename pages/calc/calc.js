// pages/calc/calc.js
const util = require('../../utils/util.js')

Page({
  data: {
    showText: '',
    result: 0,
    list: [],
    isNumber: true,
    keyboards: [
      'CE', 'C', 'X', '/',
      '7', '8', '9', '*',
      '4', '5', '6', '-',
      '1', '2', '3', '+',
      '-+', '.', '0', '='
    ],
  },

  onClick: function (event) {
    const k = event.target.dataset.key
    if (k === undefined) {
      return
    }

    this.check(k)
  },

  check: function (key) {
    const { list, } = this.data

    if ('.0123456789'.includes(key)) {
      this.setNum(key)
    } else if (key == 'C') {
      this.clear()
    } else if (key == 'X') {
      util.log('后退一步')
    } else if ('+-*/'.includes(key) && this.data.isNumber) {
      this.calc(key)
    } else if (key == '=') {
      this.equal()
    } else if (key == 'CE') {
      util.log('清除错误')
    } else if (key == '-+') {
      util.log('取相反数')
    }

    // util.log('check list', list)
  },

  setNum: function(key) {
    const { result, list, isNumber, } = this.data

    if (key == '.') {
      if (String(result).indexOf('.') < 0) {
        this.setData({ result: `${result}${key}`, })
      }
    } else {
      if (isNumber) {
        let t = `${result}${key}`
        this.setData({ result: Number(t), })
      } else {
        this.setData({ result: Number(key), })
      }
    }

    this.setData({ isNumber: true, })
  },

  calc: function(key) {
    let { list, result, showText, } = this.data
    let text = ''

    if (list.length == 2) {
      let r = this.getResult()
    
      text = `${showText}${result}${key}`
      result = r
      this.setData({ result: r, })
    } else {
      text = `${result}${key}`
    }

    this.setData({ showText: text, })
    list[0] = result
    list[1] = key
   
    this.setData({ list, })
    this.setData({ isNumber: false, })
  },

  equal: function() {
    const { list, isNumber, result, } = this.data

    if(list.length == 2 && isNumber) {

      this.setData({ result: this.getResult(), })
      this.setData({ showText: '', })
      this.setData({ list: [], })
    }

    this.setData({ isNumber: false, })
  },

  clear: function() {},

  getResult: function() {
    const { list, result, } = this.data
    const [operands, operator] = list
    let r = 0

    if (operator == '+') {
      r = Number(operands) + Number(result)
    } else if (operator == '-') {
      r = Number(operands) - Number(result)
    } else if (operator == '*') {
      r = Number(operands) * Number(result)
    } else if (operator == '/') {
      r = Number(operands) / Number(result)
    }

    return r
  }
})