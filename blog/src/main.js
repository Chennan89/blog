// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import CONST_CONFIG from '../config/const.js'

Vue.prototype.CONST_CONFIG=CONST_CONFIG;

Vue.use(ElementUI);
Vue.config.productionTip = false
//Vue.prototype.isHomePage=1;

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    activeIndex: "1"
  },
  getters: {
    getActiveIndex: state => {
      return state.activeIndex;
    }
  },
  mutations: {
    changeIndex (state,payload) {
           state.activeIndex=payload.selectedIndex;
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
