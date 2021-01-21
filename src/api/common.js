// 解决 axios 兼容 IE 问题
import 'core-js/es6/promise'
import request from '@/utils/request'
import $http from './cf'
import qs from 'qs'

/**
 * 基于 el-cascader 组件，自定义一个角色结构树组件，获取结构树上的数据
 * @param {*} params 
 * orgnSumId 当前用户身份的 areaId || 当前点击传递的 areaId
 */
export const getSysOrgnInfo = (data) => {
  
  return $http.post("/custInfo/tree/getSysOrgnInfo/init", qs.stringify(data))

  // return request({
  //   url: '/custInfo/tree/getSysOrgnInfo/init',
  //   method: 'post',
  //   data
  // })
}