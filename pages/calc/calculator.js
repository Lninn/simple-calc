const log = console.log.bind(console)

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
    this.showText = ''
    this.result = 0
    this.list = []
    this.isNumber = true
  }

  execute(method) {
    this[method.name](method.key)
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
    let result = Number(this.result)
    result = Math.floor(result / 10)
    if (result < 1) {
      result = 0
    }

    this.result = result
  }

  operator(key) {
    let { list, result, showText, isNumber, } = this

    if (isNumber || list.length == 0) {
      this.calc(key)
    } else {
      // 更改运算符
      list[1] = key
      showText = showText.replace(/[+|\-|*|\/]$/, key)

      this.list = list
      this.showText = showText
    }
  }

  equal() {
    let { list, isNumber, showText, } = this
    if (list.length == 2 && isNumber) {
      const t = this.result
      this.result = this.getResult()
      // log(this.result)
      // 添加记录
      this.records.push({
        result: this.result,
        expression: `${showText}${t}`,
      })
      this.showText = ''
      this.list = []
    }

    this.isNumber = false
  }

  clear() {
    this.setup()
  }

  history() {}

  calc(key) {
    let { list, result, showText, } = this
    let text = ''
    let r = Number(result)

    if (this.list.length == 2) {
      r = this.getResult()
      text = `${showText}${result}${key}`
    } else {
      text = `${result}${key}`
    }

    this.result = r
    this.showText = text
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
      r = Number(operands) / Number(result)
      if (String(r).split('.')[1].length >= 15) {
        r = r.toFixed(15)
      }
    }

    return r
  }
}

module.exports = Calculator
