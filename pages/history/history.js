// pages/history/history.js
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
      records: (wx.getStorageSync('records') || []).map(function ({result, expression}) {
        return { result, expression, }
      })
    })
  },
})