import Vue from 'vue'
import VueRouter from 'vue-router'

import v2rayManager from './components/v2rayManager.vue'
import duesPage from './components/duesPage.vue'
import loginPage from './components/loginPage.vue'
import profilePage from './components/profilePage.vue'
import profileSbPage from './components/profileSbPage.vue'
import queryClientTraffic from './components/queryClientTraffic.vue'
import testPage from './components/test.vue'
import userInfo from './components/userInfo.vue'
import nestedPage from './components/nested.vue'
import axios from 'axios';

Vue.use(VueRouter)

const publicPages = ['login', 'dues', 'profile', 'profilesb', 'test', 'qct'];

export const routes = [
  {
    path:'/',
    redirect: {
      name: 'dues'
    }
  },
  {
    path:'/dues',
    name: 'dues',
    component: duesPage,
  },
  {
    path: '/manager',
    name: 'manager',
    component: v2rayManager,
  },
  {
    path: '/login',
    name: 'login',
    component: loginPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: profilePage,
  },
  {
    path: '/profilesb',
    name: 'profilesb',
    component: profileSbPage,
  },
  {
    path: '/qct',
    name: 'qct',
    component: queryClientTraffic,
  },
  {
    path: '/user',
    name: 'user',
    component: nestedPage,
    redirect: {
      name: "user-info",
    },
    children: [
      {
        path: 'info',
        name: "user-info",
        title: '用户信息',
        component: userInfo,
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: testPage,
  },
  {
    path: '*',    // 此处需特别注意至于最底部
    redirect: {
      name: 'dues'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = !publicPages.includes(to.name);
  const token = localStorage.getItem('user');
  if (authRequired) {
    if (token) {
      next();
    } else {
      next({
        name: 'login'
      });
    }
  } else {
    next()
  }
})

export default router;