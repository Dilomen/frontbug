/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import FrontBug from '../../../lib/report'
Vue.use(FrontBug)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
