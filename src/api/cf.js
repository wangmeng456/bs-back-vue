'use strict'
// 解决 axios 兼容 IE 问题
import 'core-js/es6/promise'
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import {
  removeStore
} from "@/utils/localStore"
import {
  Notification,
  MessageBox
} from 'element-ui'
import {
  getToken
} from '@/utils/auth'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  if (getToken()) {
    if (config.url) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
  }
  config.cancelToken = source.token;
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  const data = response.data;
  if (data.code && data.code !== 500 && data.code !== 200 && data.code !== 201 && data.code !== 401 && data.code !== 100000 && data.code !== 70000) {
    MessageBox.alert(data.msg || '数据加载失败', {
      confirmButtonText: '确定'
    });
  }

  // 登录失效跳转
  if (data.code === 401) {
    MessageBox.confirm(
      '登录状态已过期，您可以继续留在该页面，或者重新登录',
      '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
  }
  return response
}, error => {
  console.log(error)
  return Promise.resolve(error.response)
})
export default {
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params, // get 请求时带的参数
      }).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  source
}
