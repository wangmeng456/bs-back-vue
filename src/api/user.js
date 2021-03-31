import request from '@/utils/request'

export const user = {

  /** 
   * 学生信息
   */
  users() {
    return request({
      url: '/users',
      method: 'get'
    })
  }
}