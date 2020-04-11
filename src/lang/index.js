import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh.js'
import en from './en.js'
Vue.use(VueI18n)

const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'zh': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    zh: zh,
    en: en
  },
  dateTimeFormats
})

export default i18n
