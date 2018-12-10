// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AMap from 'vue-amap'
import App from './App'
import router from './router'
import $ from 'jquery'

import './assets/semantic/dist/semantic.min.css'
import './assets/semantic/dist/semantic.min.js'

import './assets/dist/calendar.min.css'
import './assets/dist/calendar.min.js'
// import dataTable from 'datatable'

import './assets/semantic/dist/components/transition.css'
import './assets/semantic/dist/components/transition.js'
import './assets/semantic/dist/components/visibility.js'
import './assets/DataTables-1.10.15/media/css/jquery.dataTables.min.css'
import './assets/DataTables-1.10.15/media/js/jquery.dataTables.js'

import axios from 'axios'

Vue.use(AMap)
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '146f38cff16fee22715f107edad81eac',
  // 插件集合
  plugin: ['']
})
Vue.prototype.$http = axios
// Vue.use(dataTable)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
