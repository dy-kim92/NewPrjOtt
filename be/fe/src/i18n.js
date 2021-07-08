import Vue from 'vue'
import VueI18n from 'vue-i18n'
import English from './locales/en.json'
import 한국어 from './locales/kr.json'
import 日本語 from './locales/jp.json'
Vue.use(VueI18n)

export default new VueI18n({
  locale: '한국어',
  fallbackLocale: '한국어',
  messages: { English, 한국어, 日本語 }
})