import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import (/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue'),
    meta: {requiresAuth: true}
  }
  ,
  {
    path: '/device',
    name: 'Device',
    component: () => import (/* webpackChunkName: "Device" */ '@/views/Device.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import (/* webpackChunkName: "Profile" */ '@/views/Profile.vue'),
    meta: {requiresAuth: true}
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to,from,next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!localStorage.redirect || localStorage.redirect == "false"){
      router.push({path: '/login'}).catch(()=>{});
    }else{
      next();
    } 
  }else{
    next();
  }
});

export default router;
