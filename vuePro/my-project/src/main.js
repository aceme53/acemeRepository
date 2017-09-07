// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/app.css'
import './assets/bootStrap-dist/css/bootstrap.min.css'
import './assets/jq-dist/jquery.js'
Vue.config.productionTip = false;
Vue.use(router);
/* eslint-disable no-new */
$.extend({
  testFunc: function () {
    return '这是个全局方法'
  }
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
