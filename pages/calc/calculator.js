const log = console.log.bind(console)
const utils = require('../../utils/util.js')

class Calculator {
  constructor() {
    this.records = []

    this.setup()
  }

  static instance() {
    this.i = this.i || new Calculator()
    return this.i
  }

  static maps = {
    number: '.0123456789',
    clearError: 'CE',
    backspace: 'X',
    clear: 'AC',
    operator: '+-/*',
    equal: '=',
    history: 'H',
  }

  static keyMap(string) {
    const names = Object.keys(this.maps)
    for (const name of names) {
      const t = this.maps[name]
      if (t == string) {
        return { name, key: string, }
      } else if (t.includes(string)) {
        return { name, key: string, }
      }
    }
  }

  setup() {
    this.expression = ''
    this.result = 0
    this.list = []
    this.isNumber = true

    this.oldResult = 0
    this.oldExp = ''
  }

  execute({ name, key, }) {
    this[name](key)
    this.history(name)
  }

  number(key) {
    let { result, list, isNumber, } = this

    if (key == '.') {
      if (String(result).indexOf('.') < 0) {
        this.result = `${result}${key}`
      }
    } else {
      if (isNumber) {
        let t = `${result}${key}`
        this.result = Number(t)
      } else {
        this.result = Number(key)
      }
    }

    this.isNumber = true
  }

  clearError() {
    this.result = 0
  }

  backspace() {
    if (!this.isNumber) {
      return
    }

    let result = Number(this.result)
    result = Math.floor(result / 10)
    if (result < 1) {
      result = 0
    }

    this.result = result
  }

  operator(key) {
    let { list, result, expression, isNumber, } = this

    if (isNumber || list.length == 0) {
      this.calc(key)
    } else {
      // 更改运算符
      list[1] = key
      expression = expression.replace(/[+|\-|*|\/]$/, key)

      this.list = list
      this.expression = expression
    }
  }

  equal() {
    // 保存上一次的结果
    this.oldResult = this.result
    this.oldExp = this.expression

    let { list, isNumber, expression, } = this
    if (list.length == 2 && isNumber) {
      this.result = this.getResult()
      this.expression = ''
      this.list = []
    }

    this.isNumber = false
  }

  clear() {
    this.setup()
  }

  history(name) {
    const { oldExp, result, oldResult, records, } = this

    if (name == 'equal' && oldExp != '') {
      records.push({
        result: result,
        expression: `${oldExp}${oldResult}`,
      })
    }
  }

  calc(key) {
    let { list, result, expression, } = this
    let text = ''
    let r = Number(result)

    if (this.list.length == 2) {
      r = this.getResult()
      text = `${expression}${result}${key}`
    } else {
      text = `${result}${key}`
    }

    this.result = r
    this.expression = text
    list[0] = r
    list[1] = key
    this.list = list
    this.isNumber = false
  }

  getResult() {
    const { list, result, } = this
    // log(list, result)
    const [operands, operator] = list
    let r = 0

    if (operator == '+') {
      r = Number(operands) + Number(result)
    } else if (operator == '-') {
      r = Number(operands) - Number(result)
    } else if (operator == '*') {
      r = Number(operands) * Number(result)
    } else if (operator == '/') {
      r = String(Number(operands) / Number(result))
      if (r.indexOf('.') > 0 && r.split('.')[1].length >= 15) {
        r = Number(r).toFixed(14)
      }
    }

    return r
  }

  getData() {
    return {
      result: this.result,
      expression: utils.formatExpression(this.expression),
      records: this.records,
    }
  }

  setData({ expression, result,}) {
    this.expression = expression
    this.result = result
  }
}

module.exports = Calculator
