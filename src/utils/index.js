import router from '../router'

export function addDynamicRoutes(resource) {
  const defaulAdminRoute = [{
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin/Admin.vue'),
    children:
    [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Admin/Dashboard.vue')
      }
    ]
  }]

  const adminSettingRoute = {
    path: '/admin/setting',
    name: 'Setting',
    component: () => import('@/views/Admin/Dashboard.vue')
  }

  const roleRoute = {
    path: '/admin/role',
    name: 'Role',
    component: () => import('@/views/Admin/Role.vue')
  }

  const userRoute = {
    path: '/admin/user',
    name: 'User',
    component: () => import('@/views/Admin/User.vue')
  }

  resource.forEach(r => {
    if (r === 'System Management') {
      defaulAdminRoute[0].children.push(adminSettingRoute)
    } else if (r === 'User Management') {
      defaulAdminRoute[0].children.push(userRoute)
    } else if (r === 'Role Permission Management') {
      defaulAdminRoute[0].children.push(roleRoute)
    }
  })
  router.addDynamicRoutes(defaulAdminRoute)
}
