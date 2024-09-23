import { createRouter, createWebHistory } from 'vue-router'
import RouteView from '../views/RouteView.vue'
import RouteDetail from '../views/RouteDetail.vue'
import RouteEstimate from '../views/RouteEstimate.vue'
import testView from '../views/testView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/routeview',
      name: 'routeview',
      component: RouteView
    },
    {
      path: '/routedetail',
      name: 'routedetail',
      component: RouteDetail
    },
    {
      path: '/routeestimate',
      name: 'routeestimate',
      component: RouteEstimate
    },
    {
      path: '/testview',
      name: 'testview',
      component: testView
    },
    {
      path: '/businfo',
      name: 'businfo',
      component: () => import('@/views/BusInfo.vue')
    },
    {
      path: '/businfo/busdetail/:id',
      name: 'busdetail',
      component: () => import('@/views/BusDetail.vue')
    },
    {
      path: '/newestannounce',
      name: 'newestannounce',
      component: () => import('@/views/NewestAnnounce.vue')
    },
    {
      path: '/busnewestdetail',
      name: 'busnewestdetail',
      component: () => import('@/views/busNewsDetail.vue')
    },
    {
      path: '/interbusnewestdetail',
      name: 'interbusnewestdetail',
      component: () => import('@/views/interBusNewsDetail.vue')
    },
    {
      path: '/travelercontract',
      name: 'travelercontract',
      component: () => import('@/views/contractView.vue')
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: () => import('@/views/ContactUs.vue')
    },
    {
      path: '/lostproperty',
      name: 'lostproperty',
      component: () => import('@/views/LostProperty.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('@/views/AboutUs.vue')
    },
    {
      path: '/recruitment',
      name: 'recruitment',
      component: () => import('@/views/RecruitmentView.vue')
    },
    {
      path: '/connectfy',
      name: 'connectfy',
      component: () => import('@/views/ConnectFy.vue')
    },
    {
      path: '/travelfy',
      name: 'travelfy',
      component: () => import('@/views/TravelFy.vue')
    },
    {
      path: '/buscheck',
      name: 'buscheck',
      component: () => import('@/views/BusCheck.vue')
    }
  ]
})

export default router
