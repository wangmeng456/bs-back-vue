import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import MultiMenuBaseView from '@/components/MultiMenuBaseView'
/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true
  },
  // 选择用户身份
  {
    path: "/chooseAuth",
    component: () => import("@/views/chooseAuth"),
    name: "ChooseAuth",
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true
  },
  {
    path: "/NoAccess",
    component: () => import("@/views/error/NoAccess"),
    hidden: true
  },
  {
    path: "/rsa",
    component: () => import("@/views/rsa"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        component: () => import('@/views/index'),
        // component: () => import("@/views/sandTableView/businessView/contractingUnitView"),
        name: "首页",
        meta: {
          title: "首页",
          icon: "dashboard",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~消息管理 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    name: "消息管理",
    path: "/messageManagement",
    redirect: "noRedirect",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "消息管理",
      icon: "dict-space"
    },
    children: [
      {
        name: "公告信息管理",
        path: "bulletinInfoManage",
        component: () => import('@/views/messageManagement/bulletinInfoManage'),
        meta: {
          title: "公告信息管理",
          icon: "building-info-manage"
        }
      },
      {
        name: "系统通知管理",
        path: "systemInfoManage",
        component: () => import('@/views/messageManagement/systemInfoManage'),
        meta: {
          title: "系统通知管理",
          icon: "building-info-manage"
        }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~消息管理 end ~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~权限管理 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    name: "权限管理",
    path: "/management",
    redirect: "noRedirect",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "权限管理",
      icon: "dict-space"
    },
    children: [
      {
        name: "权限管理",
        path: "jurisdictionManagement",
        component: MultiMenuBaseView,
        meta: {
          title: "权限管理",
          icon: "building-info-manage"
        },
        children: [
          {
            name: "菜单权限",
            path: "menuPermissions",
            component: () => import('@/views/management/jurisdictionManagement/authorityManagement/menuPermissions'),
            meta: {
              title: "菜单权限",
              icon: "building-info-manage"
            }
          },
          {
            name: "数据权限",
            path: "systemInfoManage",
            component: () => import('@/views/management/jurisdictionManagement/authorityManagement/dataPermission'),
            meta: {
              title: "数据权限",
              icon: "building-info-manage"
            }
          }
        ]
      },
      {
        name: "角色管理",
        path: "roleManagement",
        component: MultiMenuBaseView,
        meta: {
          title: "角色管理",
          icon: "building-info-manage"
        },
        children: [
          {
            name: "角色基本信息",
            path: "roleInformation",
            component: () => import('@/views/management/jurisdictionManagement/roleManagement/roleInformation'),
            meta: {
              title: "角色基本信息",
              icon: "building-info-manage"
            }
          },
          {
            name: "角色权限管理",
            path: "roleAuthorityManagement",
            component: () => import('@/views/management/jurisdictionManagement/roleManagement/roleAuthorityManagement'),
            meta: {
              title: "角色权限管理",
              icon: "building-info-manage"
            }
          }
        ]
      },
      {
        name: "账号管理",
        path: "accountManagement",
        component: () => import('@/views/management/jurisdictionManagement/accountManagement'),
        meta: {
          title: "账号管理",
          icon: "building-info-manage"
        }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~权限管理 end ~~~~~~~~~~~~~~~~~~~~~~~~~
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~日志管理 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    name: "日志信息管理",
    path: "/logManagement",
    redirect: "noRedirect",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "日志信息管理",
      icon: "dict-space"
    },
    children: [
      {
        name: "日志记录",
        path: "logging",
        component: () => import('@/views/logManagement/logging'),
        meta: {
          title: "日志记录",
          icon: "building-info-manage"
        }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~日志管理 end ~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~系统常规设置 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    name: "系统常规设置",
    path: "/systemSettings",
    redirect: "noRedirect",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "系统常规设置",
      icon: "dict-space"
    },
    children: [
      {
        name: "个人信息设置",
        path: "personalSettings",
        component: () => import('@/views/systemSettings/personalSettings'),
        meta: {
          title: "个人信息设置",
          icon: "building-info-manage"
        }
      },
      {
        name: "系统参数设置",
        path: "parameterSetting",
        component: () => import('@/views/systemSettings/parameterSetting'),
        meta: {
          title: "系统参数设置",
          icon: "building-info-manage"
        }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~系统常规设置 end ~~~~~~~~~~~~~~~~~~~~~~~~~
];

export default new Router({
  mode: "history", // 去掉url中的#
  base: '/apps/cityplanning',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
});
