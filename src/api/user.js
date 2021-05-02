import request from '@/utils/request'

export const user = {

  /** 
   * 所有用户
   */
  users() {
    return request({
      url: '/users/all',
      method: 'get'
    })
  },
  /** 
   * 管理员
   */
   admin() {
    return request({
      url: '/users/administrator',
      method: 'get'
    })
  }
}