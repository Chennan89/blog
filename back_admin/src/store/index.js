import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    activeIndex: "1",
    allArticles:[],
  },
  getters: {
    getActiveIndex: state => {
      return state.activeIndex;
    },
    getAllArticles:state=>state.allArticles,
  },
  mutations: {
    changeIndex (state,payload) {
           state.activeIndex=payload.selectedIndex;
    },
    setAllArticles(state,payload){
          state.allArticles=payload.allArticles;
          console.log(state.allArticles);
    }
  }
})

export default store;
