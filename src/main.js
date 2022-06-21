import Vue from 'vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from"./store"

Vue.use(axios)

Vue.config.productionTip = false



new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
