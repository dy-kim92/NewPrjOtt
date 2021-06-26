import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins'




Vue.config.productionTip = false
// editor 전역에서 사용

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
