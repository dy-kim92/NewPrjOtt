import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Review from '../views/Review.vue'
import FreeBoard from '../views/FreeBoard.vue'
import E404 from '../views/e404.vue'
import Chat from '../views/Chat.vue'
import News from '../views/News.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/review',
    name: 'Review',
    component:  Review
  },
  {
    path: '/freeboard',
    name: 'FreeBoard',
    component:  FreeBoard
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
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

