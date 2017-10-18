// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 +"px";
      var deviceWidth = document.documentElement.clientWidth;
      if (deviceWidth > 750) {
        deviceWidth = 750;
      }
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";

import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
router.push('/goods')