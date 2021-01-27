import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/xiaochuan.scss' // xiaochuan css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import loginByRsa from '@/api/rsa'
import './assets/icons' // icon
import './permission' // permission control
import {
  getDicts
} from "@/api/system/dict/data";
import {
  getConfigKey
} from "@/api/system/config";
import {
  transformDateFormat,
  resetForm,
  addDateRange,
  selectDictLabel
} from "@/utils/xiaochuan";
import Pagination from "@/components/Pagination";

import VCharts from 'v-charts'

import echarts from 'echarts'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.transformDateFormat = transformDateFormat
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.$echarts = echarts

Vue.prototype.msgSuccess = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: "success"
  });
}

Vue.prototype.msgError = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: "error"
  });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

/**
 * 获取外部项目的 IP 地址
 */
Vue.prototype.getIpAddress = function (projectName) {
  const dictionary = {
    custInfo: process.env.VUE_APP_CUST_INFO_IP_ADDRESS,
    custTree: process.env.VUE_APP_CUST_TREE_IP_ADDRESS,
    custBusiness: process.env.VUE_APP_CUST_BUSINESS_IP_ADDRESS
  }
  return dictionary[projectName]
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// 修改 el-dialog 默认点击遮照为不关闭
Element.Dialog.props.closeOnClickModal.default = false;

Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

// v-charts
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
