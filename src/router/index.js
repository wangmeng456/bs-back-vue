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
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true
  },
  {
    path: "/index",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "index",
        component: () => import('@/views/index'),
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
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~课程管理 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    name: "课程管理",
    path: "/curriculum",
    redirect: "noRedirect",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "课程管理",
      icon: "dict-space"
    },
    children: [
      {
        name: "课程管理",
        path: "courseManagement",
        component: () => import('@/views/curriculum/courseManagement'),
        meta: {
          title: "课程管理",
          icon: "campus-space-manage"
        }
      },
      {
        name: "视频管理",
        path: "videoManagement",
        component: () => import('@/views/curriculum/videoManagement'),
        meta: {
          title: "视频管理",
          icon: "campus-space-manage"
        }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~课程管理 end ~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~习题管理 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    name: "习题管理",
    path: "/curriculums",
    redirect: "noRedirect",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "习题管理",
      icon: "dict-space"
    },
    children: [
      {
        name: "试卷管理",
        path: "paperManagement",
        component: () => import('@/views/curriculum/paperManagement'),
        meta: {
          title: "试卷管理",
          icon: "student-company-manage"
        }
      },
      {
        name: "练习题管理",
        path: "subjectManagement",
        component: () => import('@/views/curriculum/subjectManagement'),
        meta: {
          title: "练习题管理",
          icon: "student-company-manage"
        }
      },
      {
        name: "图形化练习管理",
        path: "codeManagement",
        component: () => import('@/views/curriculum/codeManagement'),
        meta: {
          title: "图形化练习管理",
          icon: "student-company-manage"
        }
      },
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~习题管理 end ~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~系统管理 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    name: "系统管理",
    path: "/management",
    redirect: "noRedirect",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "系统管理",
      icon: "system"
    },
    children: [
      {
        name: "角色管理",
        path: "roleManagement",
        component: () => import('@/views/management/roleManagement'),
        meta: {
          title: "角色管理",
          icon: "peoples"
        }
      },
      {
        name: "用户管理",
        path: "accountManagement",
        component: () => import('@/views/management/accountManagement'),
        meta: {
          title: "用户管理",
          icon: "user"
        }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~系统管理 end ~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~个人中心 start ~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~个人中心 end ~~~~~~~~~~~~~~~~~~~~~~~~~
];

export default new Router({
  mode: "history", // 去掉url中的#
  base: '/',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
});
