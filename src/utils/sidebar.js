import routeMap from './routemap'
import i18n from '@/lang/index'

const sideBar = () => [
  {
    name: 'Default',
    label: i18n.t('admin.aside.dashboard'),
    path: '/admin/dashboard',
    subItems: []
  },
  {
    name: 'Default',
    label: i18n.t('admin.aside.admin'),
    path: '',
    subItems: [{
      name: 'User Management',
      label: i18n.t('admin.aside.user'),
      path: '',
      subItems: []
    }, {
      name: 'Role Permission Management',
      label: i18n.t('admin.aside.role'),
      path: '',
      subItems: []
    }]
  },
  {
    name: 'Default',
    label: i18n.t('admin.aside.blog'),
    path: 'Blog',
    subItems: [{
      name: 'Blog Post',
      label: i18n.t('admin.aside.new'),
      path: '',
      subItems: []
    }, {
      name: 'Blog Management',
      label: i18n.t('admin.aside.list'),
      path: '',
      subItems: []
    }, {
      name: 'Blog Category',
      label: i18n.t('admin.aside.category'),
      path: '',
      subItems: []
    }]
  },
  {
    name: 'System Management',
    label: i18n.t('admin.aside.setting'),
    path: '',
    subItems: []
  }
]

const filterSideBar = function(newBar, fullBar, params) {
  fullBar.forEach(b => {
    let matched = b.name === 'Default'
    let path = ''
    params.forEach(p => {
      if (b.name === p) {
        const route = routeMap.get(p)
        if (route) {
          path = route.path
        }
        matched = true
      }
    })
    if (matched) {
      const item = Object.assign({}, b)
      if (b.name !== 'Default') {
        item.path = path
      }
      item.subItems = []
      filterSideBar(item.subItems, b.subItems, params)
      if (item.path !== '' || item.subItems.length > 0) {
        newBar.push(item)
      }
    }
    return newBar
  })
}

export function createSideBar(params) {
  const defaultBar = sideBar()
  const newBar = []
  filterSideBar(newBar, defaultBar, params)
  return newBar
}
