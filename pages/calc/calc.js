// pages/calc/calc.js
const Calculator = require('calculator.js')
const log = console.log.bind(console)

Page({
  data: {
    calculator: null,
    showText: '',
    history: [],
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

    const o = Calculator.keyMap(k)
    const calculator = this.data.calculator
    calculator.execute(o)

    this.showData(o.name)
  },

  showData: function(name) {
    const calculator = this.data.calculator

    this.setData({
      result: calculator.result,
      showText: calculator.showText,
    })

    if (name == 'equal') {
      this.setData({
        history: calculator.history,
      })
    }
  },

  onReady: function() {
    const calculator = Calculator.instance()
    this.setData({ calculator, })
  },
})