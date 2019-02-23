const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const log = console.log.bind(console)

const opType = {
  Number: 'NUMBER',
  Dot: 'Dot',
  Clear: 'CLEAR',
  ClearError: 'CLEARERROR',
  Back: 'BACK',
  Equal: 'EQUAL',
  Add: 'ADD',
  Sub: 'SUB',
  Mul: 'MUL',
  Div: 'DIV',
  NotNumber: 'NOTNUMBER',
}

module.exports = {
  formatTime,
  log,
  opType,
}
