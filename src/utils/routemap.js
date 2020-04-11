const routeMap = new Map([
  ['User Management', {
    path: '/admin/user',
    name: 'User',
    component: () => import('@/views/Admin/User.vue')
  }],
  ['Role Permission Management', {
    path: '/admin/role',
    name: 'Role',
    component: () => import('@/views/Admin/Role.vue')
  }],
  ['System Management', {
    path: '/admin/setting',
    name: 'Setting',
    component: () => import('@/views/Admin/Setting.vue')
  }],
  ['Blog Management', {
    path: '/admin/list',
    name: 'BlogList',
    component: () => import('@/views/Admin/List.vue')
  }],
  ['Blog Post', {
    path: '/admin/new',
    name: 'BlogNew',
    component: () => import('@/views/Admin/New.vue')
  }],
  ['Blog Category', {
    path: '/admin/category',
    name: 'BlogCategory',
    component: () => import('@/views/Admin/Category.vue')
  }]
])

export default routeMap
