import request from '@/utils/request'

export const login = {
  // 登录
  login(aname,apwd) {
    let data = {
      aname,
      apwd
    }
    return request({
      url: '/users/administrator/login',
      method: 'post',
      data: data
    })
  }
}