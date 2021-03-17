import Vue from 'vue'
import App from './App.vue'
import Counter from './QuantityCounter.vue'
import Routes from './routes.js'

//Step 1: Import and use VueRouter
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.component('counter',Counter)

//Step 3: Register Routes
const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router:myRouter,
}).$mount('#app')
