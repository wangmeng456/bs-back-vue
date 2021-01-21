import {
  constantRoutes
} from '@/router'
import {
  getRouters
} from '@/api/menu'
import datas from './data'
import Layout from '@/layout/index'
// 这是专门为了多级菜单，而使用的一个用作路由转换的基础组件
import MultiMenuBaseView from '@/components/MultiMenuBaseView'

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({
      commit
    }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        const accessedRoutes = filterAsyncRouter(datas.data)
          accessedRoutes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
        // getRouters().then(res => {
        //   console.log(datas.data)
        //   const accessedRoutes = filterAsyncRouter(datas.data)
        //   accessedRoutes.push({
        //     path: '*',
        //     redirect: '/404',
        //     hidden: true
        //   })
        //   commit('SET_ROUTES', accessedRoutes)
        //   resolve(accessedRoutes)
        // })
      })
    }
  }
}

// 动态生成路由，遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      }
      // MultiMenuBaseView 组件特殊处理
      else if (route.component === 'MultiMenuBaseView') {
        route.component = MultiMenuBaseView
      } else {
        // if(route.path.substring(0,8) === 'reportId'){
        // route.component = loadParamView(route.component,route.path)
        // }else{
        route.component = loadView(route.component)
        // }
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }

    // 这里可以对路由做特殊处理
    // if (route.path === 'areaTaskSend') {
    //   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    //   route.hidden = true
    // }

    return true
  })
}

// export const loadParamView = (view,param) => { // 路由懒加载
//   return () => import(`@/views/${view}`)
// }

export const loadView = (view) => { // 路由懒加载
  // return () => import(`@/views/${view}`)
  return (resolve) =>  require([`@/views/${view}`], resolve)
}

export default permission
