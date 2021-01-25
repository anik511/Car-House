import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// adding bootstrap 4.6
window.$ = window.jQuery = require('jquery')
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// adding bootstrap 4.6

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
