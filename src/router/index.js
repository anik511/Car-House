import Vue from 'vue'
import VueRouter from 'vue-router'
// for setting VueRouter
import ItemDetails from '../views/ItemDetails'
import Buy from '../views/Buy'
import Cards from '../views/Cards'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Cards
  },
  {
    path: '/buy',
    component: Buy
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
