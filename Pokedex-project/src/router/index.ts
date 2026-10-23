import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PokemonDetail from '../views/PokemonDetail.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      path: '/pokemon/:id',
      component: PokemonDetail,
      name: 'PokemonDetail',
    },
  ],
})
