import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Review from '../views/Review.vue'
import FreeBoard from '../views/FreeBoard.vue'
import FreeBoard2 from '../views/FreeBoard2.vue'
import SearchRank from '../views/SearchRank.vue'
import Token from '../views/token.vue'
import E404 from '../views/e404.vue'
import axios from 'axios'
Vue.use(VueRouter)

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const token = response.data.token
  console.log(token)
  // token 시간지나면 바로 store (vuex)에서 삭제시키기
  if (token) localStorage.setItem('token', token)
  // else localStorage.removeItem('token')
  return response
}, function (error) {
  // Do something with response error

  return Promise.reject(error)
})
const routes = [
  {
    path: '/review',
    name: 'Review',
    component:  Review
  },
  {
    path: '/board',
    name: 'FreeBoard',
    component:  FreeBoard
  },
  {
    path: '/board2',
    name: 'FreeBoard2',
    component:  FreeBoard2
  },
  {
    path: '/rank',
    name: 'Rank',
    component:  SearchRank
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/token',
    name: 'token',
    component: Token
  },
  {
    path: '*',
    name: 'error',
    component: E404
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
