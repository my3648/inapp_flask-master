// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AMap from 'vue-amap'
import App from './App'
import router from './router'
import $ from 'jquery'

import './assets/semantic/dist/semantic.min.css'
import './assets/semantic/dist/semantic.min.js'
import ElementUI from 'element-ui'

import './assets/dist/calendar.min.css'
import './assets/dist/calendar.min.js'
// import dataTable from 'datatable'

import './assets/semantic/dist/components/transition.css'
import './assets/semantic/dist/components/transition.js'
import './assets/semantic/dist/components/visibility.js'
import './assets/DataTables-1.10.15/media/css/jquery.dataTables.min.css'

// import './assets/DataTables-1.10.15/media/css/dataTables.semanticui.css'
import './assets/DataTables-1.10.15/media/js/jquery.dataTables.js'

Vue.use(ElementUI)
import axios from 'axios'
// axios.interceptors.request.use(function(config) {

//   if (!config.url.endsWith('/login')) {
//     config.headers['Authorization'] = localStorage.getItem('token')
//   }
//   // console.log('请求拦截器', config)
//   return config
// })

// // 响应拦截器
// axios.interceptors.response.use(function(response) {
//
//   // console.log('响应拦截器', response)
//   if (response.data.meta.status === 401) {

//     router.push('/login')
//     localStorage.removeItem('token')
//   }

//   return response
// })

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
