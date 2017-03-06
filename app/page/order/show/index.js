// page/order/show/index.js
import { datetimeFormat, confirm } from '../../../assets/libs/utils'
import {
  getOrderInfo,
  cancelOrder, giveupOrder,
  agreeGiveupOrder, disagreeGiveupOrder,
  finishOrder,
} from '../../../assets/libs/apis'
import {
  STATUS, STATUS_GIVEUP,
  START_LABEL
} from '../list/constant'

Page({
  data: {
    orderInfo: {},
    STATUS, START_LABEL
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.order_id = options.id
    this.loadData()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh: function () {
    this.loadData()
  },
  loadData() {
    const that = this,
      order_id = this.order_id
    getOrderInfo({
      order_id,
      success(data) {
        data.add_time_format = datetimeFormat(data.add_time)
        data.status_label = data.state == '5' ? STATUS_GIVEUP[data.giveup] : STATUS[data.state]

        that.setData({
          orderInfo: data
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone,
      success: function (res) {
        // success
      }
    })
  },
  onCancel(e) {
    const order_id = this.order_id,
      that = this
    confirm({
      content: '您是否确定取消订单?',
      confirmText: '确认取消',
      ok() {
        cancelOrder({
          order_id,
          success(data) {
            that.loadData()
          }
        })
      }
    })
  },
  onGiveup(e) {
    const order_id = this.order_id,
      that = this
    confirm({
      content: '您是否确定放弃订单?',
      confirmText: '确认放弃',
      ok() {
        giveupOrder({
          order_id,
          success(data) {
            that.loadData()
          }
        })
      }
    })
  },
  onDisagree(e) {
    const order_id = this.order_id,
      that = this
    confirm({
      content: '您是否确定不同意放弃订单?',
      confirmText: '不同意',
      ok() {
        disagreeGiveupOrder({
          order_id,
          success(data) {
            that.loadData()
          }
        })
      }
    })
  },
  onAgree(e) {
    const order_id = this.order_id,
      that = this
    confirm({
      content: '您是否确定同意放弃订单?',
      confirmText: '同意',
      ok() {
        agreeGiveupOrder({
          order_id,
          success(data) {
            that.loadData()
          }
        })
      }
    })
  },
  onFinish(e) {
    const order_id = this.order_id,
      that = this
    confirm({
      content: '您是否确定完成订单?',
      confirmText: '确定完成',
      ok() {
        finishOrder({
          order_id,
          success(data) {
            that.loadData()
          }
        })
      }
    })
  },
})