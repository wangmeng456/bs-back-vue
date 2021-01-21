// 楼宇信息管理 页面接口
import request from '@/utils/request'
import $http from '../cf'
import qs from 'qs'

export const businessCustomerSpaceManage = {
  getMarketGirdBall(data){
    return $http.post("/shenyang/businessCustomerSpace/getMarketGirdBall",qs.stringify({'zoneId':data}))
  },
  getMarketGirdPie(data){
    return $http.post("/shenyang/businessCustomerSpace/getMarketGirdPie", qs.stringify({'zoneId':data}))
  },
  getMarketGirdLine(data){
    return $http.post("/shenyang/businessCustomerSpace/getMarketGirdLine", qs.stringify({'zoneId':data}))
  },
  getMarketGirdBar(data){
    return $http.post("/shenyang/businessCustomerSpace/getMarketGirdBar", qs.stringify({'zoneId':data}))
  },
  queryUserInfo(data) {
    return $http.post("/shenyang/businessCustomerSpace/queryUserInfo", qs.stringify(data))
  },

  getMarketList(data) {
    return $http.post("/shenyang/businessCustomerSpace/getMarketList", qs.stringify(data))
  },

  getSpaceList(data) {
    return $http.post("/shenyang/businessCustomerSpace/getSpaceList", qs.stringify(data))
  },

  getCompanyList(data) {
    return $http.post("/shenyang/businessCustomerSpace/getCompanyList", qs.stringify(data))
  },

  getSpaceAddr(data) {
    return $http.post("/shenyang/businessCustomerSpace/getSpaceAddr", qs.stringify(data))
  },

  queryEntBaseInfo(data) {
    return $http.post("/shenyang/businessCustomerSpace/queryEntBaseInfo", qs.stringify(data))
  },

  updateEntBaseAddr(data) {
    return $http.post("/shenyang/businessCustomerSpace/updateEntBaseAddr", qs.stringify(data))
  },

  updateZoneInfo(data) {
    return $http.post("/shenyang/businessCustomerSpace/updateZoneInfo", qs.stringify(data))
  },

}
