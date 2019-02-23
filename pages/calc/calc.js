// pages/calc/calc.js
const Calculator = require('calculator.js')

Page({
  data: {
    calculator: null,
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

  onClick: function (event) {
    const k = event.target.dataset.key
    if (k === undefined) {
      return
    }

    const name = Calculator.keyMap(k)
    const calculator = this.data.calculator
    calculator.execute(name)

    this.setData({
      result: calculator.result,
      showText: calculator.showText,
    })
  },

  onReady: function() {
    const calculator = Calculator.instance()
    this.setData({ calculator, })
  },
})