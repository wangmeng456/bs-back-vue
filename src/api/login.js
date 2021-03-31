import request from '@/utils/request'

export const login = {
  // 登录
  login(stuemail,stupwd) {
    let data = {
      stuemail,
      stupwd
    }
    return request({
      url: '/login',
      method: 'post',
      data: data
    })
  }
}