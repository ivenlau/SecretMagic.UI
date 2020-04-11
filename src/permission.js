import router from './router'
import store from './store'
import Cookies from 'js-cookie'

router.beforeEach(async(to, from, next) => {
  const whiteList = ['Login', 'Blog', 'Post', 'Query', 'Category', 'Detail', 'About']
  // document.title = getPageTitle(to.meta.title)

  let profile = store.state.profile
  let valid = false
  if (profile) {
    if (profile.token) {
      valid = true
    }
  }

  if (!valid) {
    profile = Cookies.get('profile')
    if (profile) {
      profile = JSON.parse(profile)
      store.dispatch('saveProfile', profile)
      valid = true
    }
  }

  if (valid) {
    if (to.path === '/login') {
      next({ path: '/admin' })
    } else if (to.matched.length > 0) {
      next()
    } else {
      next(to)
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.name) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
