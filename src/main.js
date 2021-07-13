import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
