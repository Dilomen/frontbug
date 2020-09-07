/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import vangenBug from 'vangen-sdk'
Vue.use(vangenBug.init({
  BASE_URL:"http://localhost:3090"
}))

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
