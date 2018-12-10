import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/Home/home.vue')
const Index = () => import('@/components/Index/index.vue')
const Analytics = () => import('@/components/Analytics/analytics.vue')
const Login = () => import('@/components/Login/login.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/analytics',
      component: Analytics
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
