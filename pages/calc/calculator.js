class Calculator {
  constructor() {
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
    clear: 'C',
    calc: '+-/*',
    equal: '=',
    swap: '-+',
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

  execute(method) {
    this[method.name](method.key)
  }

  setup() {
    this.showText = ''
    this.result = 0
    this.list = []
    this.isNumber = true
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

  calc(key) {
    let { list, result, showText, } = this
    result = Number(result)

    if (this.list.length == 2) {
      let r = this.getResult()
      this.showText = `${this.showText}${result}${key}`
      this.result = r
    } else {
      this.showText = `${result}${key}`
    }

    list[0] = result
    list[1] = key

    this.result = result
    this.list = list
    this.isNumber = false
  }

  equal() {
    if (this.list.length == 2 && this.isNumber) {

      this.result = this.getResult()
      this.showText = ''
      this.list = []
    }

    this.isNumber = false
  }

  swap() {
    this.result = -this.result
  }

  clear() {
    this.setup()
  }

  getResult() {
    const { list, result, } = this
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
}

module.exports = Calculator
