// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './socket'

// font-awesome
import 'font-awesome/css/font-awesome.min.css'

// Bulma
// https://bulma.io/
import 'bulma/css/bulma.css'

// import 'material-design-lite/material.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
