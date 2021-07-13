<template>
	<div class="h-100">
		<nav class="navbar shadow px-md-5 navbar-light bg-light">
		  	<a class="navbar-brand mr-0 mr-md-5 w-md-25" href="#">
			    <img 
			    	src="static/img/logo_fime.png" 
			    	class="d-none ml-md-5 d-md-block align-top img-fluid" 
			    	alt="" loading="lazy" />
			    <img 
			    	src="static/img/icono_fime.png" 
			    	class="d-md-none d-block align-top img-fluid"
			    	style="max-height:60px;" 
			    	alt="" loading="lazy" />
		  	</a>
			<h1 
				style="font-family: fantasy;" 
				class="d-none d-lg-block text-success text-center">
				{{menu.titulo}}
			</h1>
			<h3 
				style="max-width:50%;" 
				class="d-block d-md-none text-success text-center">
				<b>{{menu.titulo}}</b>
			</h3>
		  	<div class="w-md-25">
			  	<img 
			    	src="static/img/logo_uanl.png"
			    	style="max-height:100px;" 
			    	class="mr-md-5 d-none d-md-block ml-auto align-top img-fluid" 
			    	alt="" loading="lazy" />
		    	<img 
			    	src="static/img/icono_uanl.png" 
			    	class="d-md-none d-block ml-auto align-top img-fluid"
			    	style="max-height:60px;" 
			    	alt="" loading="lazy" />
			</div>
		</nav>
		<div 
			style="background-color:#6c757d29 !important;" 
			class="container-fluid h-100">
			<div class="container h-100">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data () {
    return {
      
    }
  },
  computed:{
  	...mapState(['menu'])
  }
};
</script>

<style>
html{
	height: 100%;
}
body{
	height: 100%;
}
</style>
