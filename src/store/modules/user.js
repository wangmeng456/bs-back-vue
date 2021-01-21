import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  removeStore
} from '@/utils/localStore'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router from '@/router'
import {
  getStore,
  setStore
} from "@/utils/localStore";
// findIndex 该方法返回第一个通过 predicate 判断为真值的元素的索引值（index）
import {
  findIndex
} from "lodash-es";

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    // 客户经理 id
    managerId: '',
    // 本地网 id
    latnId: '',
    // 区域 id
    areaId: '',
    // 手机号
    phoneNumber: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_MANAGERID: (state, managerId) => {
      state.managerId = managerId
    },
    SET_LATNID: (state, latnId) => {
      state.latnId = latnId
    },
    SET_AREAID: (state, areaId) => {
      state.areaId = areaId
    },
    SET_PHONENUMBER: (state, phoneNumber) => {
      state.phoneNumber = phoneNumber
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then(res => {
            // setToken(res.token)
            // commit('SET_TOKEN', res.token)
            // resolve()
            // 因为这里需要在 login.vue 登录页面再 新增一个选择身份的弹窗，所以需要将所需的数据传递过去
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(res => {
            const user = res.user
            const avatar =
              user.avatar == '' ?
              require('@/assets/image/profile.jpg') :
              process.env.VUE_APP_BASE_API + user.avatar
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', res.roles)
              commit('SET_PERMISSIONS', res.permissions)
            } else {
              commit('SET_ROLES', ['ROLE_DEFAULT'])
            }
            commit('SET_NAME', user.username)
            commit('SET_AVATAR', avatar)

            // 判断如果是非切换身份页面的话，这里需要获取 localStorage 中选中身份的用户信息，因为刷新会将选角色时储存的信息清除掉
            if (router.currentRoute.name !== "ChooseAuth") {
              let userInfo = JSON.parse(getStore("__userInfo__"));
              if (userInfo) {
                commit("SET_PHONENUMBER", userInfo.phonenumber);
                const {
                  managerId,
                  latnId,
                  areaId
                } = userInfo.currentManagerTm;
                commit("SET_MANAGERID", managerId);
                commit("SET_LATNID", latnId);
                commit("SET_AREAID", areaId);
              }
            }
            /*************存储集团项目所需的 localStorage */
            // 转换数据
            let storageData = res.jtinfodata;
            // 容错
            if (JSON.stringify(storageData) !== '{}') {
              // 判断非集团用户
              if (!storageData.role) {
                const area = storageData.area;
                const prvnce_id = storageData.prvnce_id;
                const index = findIndex(area, {
                  value: prvnce_id
                });
                // 容错
                if (index !== -1) {
                  // 城市数据转换为对应的省份
                  storageData.area = area[index].children;
                  // 自定义一个当前省份的数据，以供后面的接口使用
                  storageData.provinceData = {
                    value: prvnce_id,
                    text: area[index].text
                  };
                }
              } else {
                // 写死地域名称
                storageData.provinceData = {
                  text: "北京"
                };
              }
              // 存储 storageData
              setStore("storageData", JSON.stringify(storageData))
            }


            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 退出系统
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_PERMISSIONS', [])
            removeToken()
            // 删掉 localStorage 存储的数据
            removeStore('__userInfo__')
            removeStore('storageData')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
