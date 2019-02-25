// pages/history/history.js
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      records: (wx.getStorageSync('records') || []).map(function ({ result, expression, }) {
        return { result, expression: utils.formatExpression(expression), }
      })
    })
  },

  handleClick: function(event) {
    const { currentTarget: { dataset: { record, } } } = event

    if (!!record) {
      // 将一个对象格式化为 url 参数的形式
      const t = Object.keys(record)
        .map(key => `${key}=${record[key]}`)
        .reduce((pre, next) => `${pre}&${next}`, '')
        .replace(/^[&]/, '?')

      wx.redirectTo({
        url: '../calc/calc' + t
      })
    }
  },
})