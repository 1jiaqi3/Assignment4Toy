// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Account from './components/Account/account.vue'
import MyBook from './components/MyBook/MyBook.vue'
import Request from './components/Request/Request.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Account },
  { path: '/account', component: Account },
  { path: '/mybook', component: MyBook },
  { path: '/request', component: Request }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
