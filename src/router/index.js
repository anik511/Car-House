import Vue from 'vue'
import VueRouter from 'vue-router'
// for setting VueRouter
import ItemDetails from '../views/ItemDetails'
import Buy from '../views/Buy'
import Cards from '../views/Cards'
import Register  from '../views/Register.vue'
import Login from "../views/Login.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Cards
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    // children: [
      
    // ],
    
  },
  {
    path: '/register',
    component: Register,
    beforeEnter: ((to, from, next) => {
      if (from.name !== 'Login'){
        next({ name: 'Login'})
      }else next()
    }),
  },
  {
    path: '/buy',
    component: Buy,
    beforeEnter: ((to, from, next) => {
      if (localStorage.getItem("userLogin") == true){
        next({ path: '/buy'})
      }else next()
    }),
  },
  {
    path: "/item/:id",
    component: ItemDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
