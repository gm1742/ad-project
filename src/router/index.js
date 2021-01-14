import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '../components/Home.vue'
import Login from '../components/auth/Login'
import Registrations from '../components/auth/Registrations'
import AdList from '../components/ads/AdList'
import NewAd from '../components/ads/NewAd'
import Ad from '../components/ads/Ad'
import Orders from '../components/Orders'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registrations',
    name: 'Registrations',
    component: Registrations
  },
  {
    path: '/adlist',
    name: 'AdList',
    component: AdList,
    beforeEnter: AuthGuard
  },
  {
    path: '/ad/:id',
    name: 'Ad',
    component: Ad
  },
  {
    path: '/newad',
    name: 'NewAd',
    component: NewAd,
    beforeEnter: AuthGuard
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
