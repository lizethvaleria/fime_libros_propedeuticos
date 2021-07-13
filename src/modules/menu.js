import Vue from 'vue';
import router from '../router';

export default {
    state:{
      titulo:'¡Bienvenido!',
      opcion_activa:'Login'
    },
    mutations: {
      setOpcionActiva(state,opcion_activa){
        state.opcion_activa=opcion_activa;
      }
    },
    actions: {
      ActualizarOpcionActiva(context,opcion_activa){
        context.commit('setOpcionActiva',opcion_activa);
      }
    },
    getters: {  
      getMenu(state){
        return state;
      },
      getOpcionActiva(state){
        return state.opcion_activa;
      },
    },
    
}