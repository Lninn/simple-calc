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
    let { list, isNumber, result, } = this.data

    if ('.0123456789'.includes(key)) {
      this.setNum(key)
    } else if (key == 'C') {
      this.clear()
    } else if (key == 'X') {
      this.backspace()
    } else if ('+-*/'.includes(key)) {
      if (isNumber || list.length == 0) {
        this.calc(key)
      } else {
        // 更改运算符
        let { list, showText, } = this.data
        list[1] = key
        showText = showText.replace(/[+|\-|*|\/]$/, key)
     
        this.setData({ list, })
        this.setData({ showText, })
      }
    } else if (key == '=') {
      this.equal()
    } else if (key == 'CE') {
      this.setData({ result: 0, })
    } else if (key == '-+') {
      result = Number(result)
      this.setData({ result: -result, })
    }
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

  clear: function() {
    this.setData({ result: 0, })
    this.setData({ showText: '', })
    this.setData({ list: [], })
  },

  backspace: function() {
    let { result, } = this.data

    result = Number(result)
    result = Math.floor(result / 10)
    if (result < 1) {
      result = 0
    }
    this.setData({ result, })
  },

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