import Vue from 'vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios' 
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from"./store"

Vue.use(VueAxios,axios)

Vue.config.productionTip = false
//const cors = require('cors');
//Vue.use(cors());


new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
