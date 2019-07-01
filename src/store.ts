import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerState: true, // Состояние выдвижного меню.
  },
  getters : {
    DRAWER_STATE: state => {
      return state.drawerState;
    },
  },
  mutations: {
    SWITCH_DRAWER_STATE: (state) => {
      state.drawerState = !state.drawerState;
    },
    CLOSE_DRAWER: (state) => {
      state.drawerState = false;
    }
  },
  actions: {
    SWITCH_DRAWER_STATE: async (context) => {
      context.commit('SWITCH_DRAWER_STATE');
    },
    CLOSE_DRAWER: async (context) => {
      context.commit('CLOSE_DRAWER');
    }
  },
});
