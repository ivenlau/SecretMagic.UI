import axios from 'axios'
import store from '@/store'
import Cookies from 'js-cookie'
import router from '@/router'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.state.profile && store.state.profile.token) {
      config.headers.Authorization = 'Bearer ' + store.state.profile.token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  })

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        Cookies.remove('profile')
        store.dispatch('saveProfile', {})
        router.push('/login')
      } else {
        Message.error(error.response.data)
      }
    } else {
      Message.error(error)
    }
    return Promise.reject(error)
  })

export default service
