import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AccountPage from '../views/AccountPage.vue'
import CartPage from '../views/CartPage.vue'
import QuestionPage from '../views/QuestionPage.vue'  // punaise
import ProposPage from '../views/ProposPage.vue'  // help j'y arrive pas RAHHHA
import PolitiquePage from '@/views/PolitiquePage.vue' //
import NosEquipesPage from '@/views/NosEquipesPage.vue' //
import MentionsPage from '@/views/MentionsPage.vue' //
import ConditionsPage from '@/views/ConditionsPage.vue' //
import CeMomentPage from '@/views/CeMomentPage.vue' //
import CadeauxPage from '@/views/CadeauxPage.vue' //
import CookiesPage from '@/views/CookiesPage.vue' //
import LoginPage from '@/views/LoginPage.vue' //
import RegisterPage from '@/views/RegisterPage.vue' //
import AdminPage from '@/views/AdminPage.vue' // 
import RequestPage from '@/views/RequestForm.vue' //
import Sucess from '@/views/Sucess.vue' //

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionPage
  },
  {
  path: '/propos',
  name: 'propos',
  component: ProposPage
},
  {
    path: '/politique',
    name: 'politique',  
    component: PolitiquePage
  },
  {
    path: '/nos-equipes',
    name: 'nos-equipes',
    component: NosEquipesPage
  },
  {
    path: '/mentions',
    name: 'mentions',
    component: MentionsPage
  },
  {
    path: '/conditions',
    name: 'conditions',
    component: ConditionsPage
  },
  {
    path: '/ce-moment',
    name: 'ce-moment',
    component: CeMomentPage
  },
  {
    path: '/cadeaux',
    name: 'cadeaux',
    component: CadeauxPage
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: CookiesPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/request',
    name: 'request',
    component: RequestPage
  },
  {
    path: '/success',
    name: 'sucess',
    component: Sucess
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
