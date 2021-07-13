import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import MenuModule from '@/modules/menu';

export default new Vuex.Store({
  modules: {
    menu: MenuModule
  }
})