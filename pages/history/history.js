// pages/history/history.js
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    recordName: 'RECORDS',
    currentRecord: 'CURRENT_RECORD',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      records: (wx.getStorageSync(this.data.recordName) || []).map(function ({ result, expression, }) {
        return { result, expression: utils.formatExpression(expression), }
      })
    })
  },

  handleClick: function(event) {
    const { currentTarget: { dataset: { record, } } } = event

    if (!!record) {
      wx.setStorageSync(this.data.currentRecord, record)
      wx.navigateBack({
        delta: 1
      })
    }
  },
})