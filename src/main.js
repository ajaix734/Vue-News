// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

Vue.use(Vuetify)
Vue.use(VueResource)
NProgress.configure({ easing: 'ease', speed: 500, minimum: 0.8 });
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
