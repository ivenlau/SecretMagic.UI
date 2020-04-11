import Vue from 'vue'
import Vuex from 'vuex'
import { createSideBar } from '@/utils/sidebar'
import router from '@/router'
import { getSetting } from '@/api/setting'
import i18n from '@/lang/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: {},
    sideBar: {},
    siteSetting: {}
  },
  getters: {
    userName: state => {
      let user = ''
      if (state.profile) {
        if (state.profile.user) {
          if (state.profile.user.name) { user = state.profile.user.name }
        }
      }
      return user
    },
    siteName: state => {
      let name = ''
      if (state.siteSetting) {
        if (state.siteSetting.name) {
          name = state.siteSetting.name
        }
      }
      return name
    },
    siteTitle: state => {
      let title = ''
      if (state.siteSetting) {
        if (state.siteSetting.title) {
          title = state.siteSetting.title
        }
      }
      return title
    },
    siteSubject: state => {
      let subject = ''
      if (state.siteSetting) {
        if (state.siteSetting.subject) {
          subject = state.siteSetting.subject
        }
      }
      return subject
    },
    siteDescription: state => {
      let description = ''
      if (state.siteSetting) {
        if (state.siteSetting.description) {
          description = state.siteSetting.description
        }
      }
      return description
    }
  },
  mutations: {
    saveProfile(state, profile) {
      state.profile = profile
    },
    SET_SIDEBAR(state, sideBar) {
      state.sideBar = sideBar
    },
    SET_SITESETTING(state, setting) {
      state.siteSetting = setting
    }
  },
  actions: {
    saveProfile({ dispatch, commit }, profile) {
      commit('saveProfile', profile)
      dispatch('setSiteSetting')
      if (profile.resource) {
        router.addDynamicRoutes(profile.resource)
        const sideBar = createSideBar(profile.resource)
        commit('SET_SIDEBAR', sideBar)
      }
    },
    setSiteSetting({ commit }) {
      return new Promise((resolve, reject) => {
        getSetting().then(data => {
          commit('SET_SITESETTING', data.data)
          i18n.locale = data.data.language === 0 ? 'zh' : 'en'
          resolve(data.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {

  }
})
