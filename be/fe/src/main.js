import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMaterial from 'vue-material'
import './plugins'
import Directives from './plugins/directives' 
import io from 'socket.io-client'; 
import i18n from './i18n'
const socket = io('http://localhost:3000'); 

Vue.prototype.$socket = socket; 
Vue.use(Directives)
Vue.use(VueMaterial)

Vue.config.productionTip = false
// editor 전역에서 사용

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
