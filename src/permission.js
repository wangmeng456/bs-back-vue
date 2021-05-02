import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { setStore,getStore } from "@/utils/localStore";

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
  "/login",
  "/index/index",
  "/user/profile",
  "/systemSettings/personalSettings",
  "/management/roleManagement",
  "/management/accountManagement",
  "/curriculum/videoManagement",
  "/curriculums/subjectManagement",
  "/curriculum/courseManagement",
  "/curriculums/paperManagement",
  "/curriculums/codeManagement"
];

let user = JSON.parse(getStore("user"));
router.beforeEach((to, from, next) => {
  if(to.path === '/') {
    next({path: "/login"})
  }
  NProgress.start();
  !store.getters.permission_routes.length && store.dispatch("GenerateRoutes");
  if (whiteList.indexOf(to.path) !== -1 || testList.includes(to.path) ) {
    next();
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
