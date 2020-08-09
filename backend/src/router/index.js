import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  
 
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'dashboard' }
    }]
  },

  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/teacher',
    component: Layout,
    redirect: "/teacher/list",
    meta: { title: '讲师管理', icon: 'el-icon-menu',roles: ["讲师管理"] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/teacher/list'),
        meta: { title: '讲师列表', icon: 'el-icon-more' }
      },
      {
        path: 'add',
        component: () => import('@/views/teacher/add'),
        meta: { title: '讲师添加', icon: 'el-icon-circle-plus-outline' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/teacher/add'),
        meta: { title: '讲师修改', icon: 'el-icon-circle-plus-outline' },
        hidden: true,
      },
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: "/subject/list",
    meta: { title: '分类管理', icon: 'el-icon-menu',roles: ["分类管理"] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/subject/list'),
        meta: { title: '分类列表', icon: 'el-icon-more' }
      },
      {
        path: 'add',
        component: () => import('@/views/subject/add'),
        meta: { title: '添加分类', icon: 'el-icon-circle-plus-outline' }
      },
      
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: "/course/list",
    meta: { title: '课程管理', icon: 'el-icon-menu', roles: ["课程管理"]},
    children: [
      {
        path: 'list',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: 'el-icon-more' }
      },
      {
        path: 'add',
        component: () => import('@/views/course/add'),
        meta: { title: '添加课程', icon: 'el-icon-circle-plus-outline' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/course/add'),
        meta: { title: '修改课程信息课程', icon: 'el-icon-circle-plus-outline' },
        hidden: true,
      },
      {
        path: "chapter/:id",
        component: () => import('@/views/course/chapter'),
        meta: { title: '课程大纲', icon: 'el-icon-circle-plus-outline' },
        hidden: true,
      },
      {
        path: "publish/:id",
        component: () => import('@/views/course/publish'),
        meta: { title: '发布课程', icon: 'el-icon-circle-plus-outline' },
        hidden: true,
      }
      
    ],
  },
    {
    path: '/chart',
    component: Layout,
    redirect: "/chart/show",
    meta: { title: '统计分析', icon: 'el-icon-menu',roles: ["统计分析"] },
    children: [
      {
        path: 'show',
        component: () => import('@/views/chart/show'),
        meta: { title: '图表', icon: 'el-icon-more' }
      },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    meta: { title: '权限管理', icon: 'el-icon-menu',roles: ["权限管理"] },
    children: [
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        meta: { title: '角色管理', icon: 'el-icon-more' }
      },
      {
        path: 'role/add',
        component: () => import('@/views/admin/editRole'),
        meta: { title: '角色添加', icon: 'el-icon-more' },
        hidden: true,
      },
      {
        path: 'role/assign/:id',
        component: () => import('@/views/admin/assignPermission'),
        meta: { title: '角色授权', icon: 'el-icon-more' },
        hidden: true,
      },
      {
        path: 'role/edit/:id',
        component: () => import('@/views/admin/editRole'),
        meta: { title: '角色修改', icon: 'el-icon-more' },
        hidden: true,
      },
      {
        path: 'user',
        component: () => import('@/views/admin/user'),
        meta: { title: '用户管理', icon: 'el-icon-more' }
      },
      {
        path: 'user/assign/:id',
        component: () => import('@/views/admin/assignRole'),
        meta: { title: '用户授权', icon: 'el-icon-more' },
        hidden: true,
      },
      {
        path: 'user/add',
        component: () => import('@/views/admin/editUser'),
        meta: { title: '用户添加', icon: 'el-icon-more' },
        hidden: true,
      },
      {
        path: 'user/edit/:id',
        component: () => import('@/views/admin/editUser'),
        meta: { title: '用户修改', icon: 'el-icon-more' },
        hidden: true,
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
