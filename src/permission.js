import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { setStore } from "@/utils/localStore";

NProgress.configure({
  showSpinner: false
});

// 免登录路由白名单
const whiteList = [
  "/login",
  "/auth-redirect",
  "/bind",
  "/register",
  "/rsa",
  "/NoAccess"
];

const testList = [
  "/",
  "/index",
  "/messageManagement/bulletinInfoManage",
  "/messageManagement/systemInfoManage",
  "/logManagement/logging",
  "/systemSettings/personalSettings",
  "/systemSettings/parameterSetting",

  "/management/jurisdictionManagement/menuPermissions",
  "/management/jurisdictionManagement/systemInfoManage",
  "/management/roleManagement/roleInformation",
  "/management/roleManagement/roleAuthorityManagement",
  "/management/accountManagement",
];

router.beforeEach((to, from, next) => {
  NProgress.start();
  // if (getToken()) {
  //   /* has token*/
  //   if (to.path === "/login") {
  //     next({
  //       path: "/"
  //     });
  //     NProgress.done();
  //   } else {
  //     if (store.getters.roles.length === 0) {
  //       // 判断当前用户是否已拉取完user_info信息
  //       store.dispatch("GetInfo").then(res => {
  //         // 拉取user_info
  //         const roles = res.roles;
  //         // 判断如果是切换身份页面的话，需要储存一下用户信息
  //         if (to.name === "ChooseAuth") {
  //           setStore("__userInfo__", JSON.stringify(res.user));
  //         }

  //         store
  //           .dispatch("GenerateRoutes", {
  //             roles
  //           })
  //           .then(accessRoutes => {
  //             // 测试 默认静态页面
  //             // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
  //             // 根据roles权限生成可访问的路由表
  //             router.addRoutes(accessRoutes); // 动态添加可访问路由表
  //             next({
  //               ...to,
  //               replace: true
  //             }); // hack方法 确保addRoutes已完成
  //           });
  //       });
  //       // .catch(err => {
  //       //   store.dispatch('FedLogOut').then(() => {
  //       //     // Message.error('登录信息获取失败！')
  //       //     next({
  //       //       path: '/'
  //       //     })
  //       //   })
  //       // })
  //     } else {
  //       next();
  //       // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
  //       // if (hasPermission(store.getters.roles, to.meta.roles)) {
  //       //   next()
  //       // } else {
  //       //   next({ path: '/401', replace: true, query: { noGoBack: true }})
  //       // }
  //       // 可删 ↑
  //     }
  //   }
  // } else {
    
  //   // 修复演示所有静态路由，未挂载到左侧菜单的 bug
  //   !store.getters.permission_routes.length && store.dispatch("GenerateRoutes");
  //   // 没有token
  //   // 新增 演示用静态路由 判断
  //   if (whiteList.indexOf(to.path) !== -1 || testList.includes(to.path)) {
  //     // 在免登录白名单，直接进入
  //     next();
  //   } else {
  //     next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
  //     NProgress.done();
  //   }
  // }
  !store.getters.permission_routes.length && store.dispatch("GenerateRoutes");
  if (whiteList.indexOf(to.path) !== -1 || testList.includes(to.path) ) {
    next();
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
