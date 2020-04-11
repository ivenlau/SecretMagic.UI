import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import routeMap from '@/utils/routemap.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('@/views/Admin/Admin.vue'),
    children:
    []
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:
    [
      {
        path: '/',
        name: 'Blog',
        component: () => import('@/views/Blog/Blog.vue')
      },
      {
        path: '/post',
        name: 'Post',
        component: () => import('@/views/Blog/Post.vue')
      },
      {
        path: '/category/:category',
        name: 'Category',
        component: () => import('@/views/Blog/Post.vue')
      },
      {
        path: '/query/:query',
        name: 'Query',
        component: () => import('@/views/Blog/Post.vue')
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/views/Blog/Detail.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/Blog/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.addDynamicRoutes = function(params) {
  routes[0].children = [{
    path: '/admin/dashboard',
    name: 'Dashboard',
    alias: '',
    component: () => import('@/views/Admin/Dashboard.vue')
  }]
  params.forEach(p => {
    const route = routeMap.get(p)
    if (route) {
      routes[0].children.push(route)
    }
  })
  router.matcher = new VueRouter().matcher
  router.addRoutes(routes)
}

export default router
