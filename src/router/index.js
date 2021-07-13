import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Menu from '@/components/Menu'

const Paquete_Libros   = () => import('@/components/Paquete_Libros/Paquete_Libros.vue');
const ImprimirDia   = () => import('@/components/Paquete_Libros/ImprimirDia.vue');

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Menu', component: Menu, children:[
    	{path: 'alumno', name: 'Login', component: Login},
    	{path: 'paquete', name: 'Paquete_Libros', component: Paquete_Libros},
    	{path: 'imprimir', name: 'ImprimirDia', component: ImprimirDia},
    ]}
  ]
})
