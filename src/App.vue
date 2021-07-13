<template>
  <router-view class="h-100" />
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth'
export default {
  created(){
  	var that =this;
  	firebase.auth().signInWithEmailAndPassword('solucionesendesarrolloweb@gmail.com', 'UanlFime.2020')
  	.then(response=>{
  		that.$router.push({name:'Login'});
  	})
  	.catch(function(error) {
	  swal('A ocurrido un error','Favor de recargar la página','error');
	});
  }
};
</script>

<style>

</style>
