<template>
  <div class="row h-100 justify-content-center">
    <div class="col-md-8 h-75 mt-4 pt-3 bg-white">
      <div class="row justify-content-around">
        <div class="col-md-4 col-6 text-center">
          <img class="img-fluid" style="max-height:90px;" src="static/img/logo_fime.png" alt="">
        </div>
        <div class="col-md-4 col-6 text-center">
          <img class="img-fluid" style="max-height:90px;" src="static/img/logo_uanl.png" alt="">
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8 mt-5">
          <div class="row justify-content-center">
            <div class="col-12 text-center">
              <h5><b>Matricula </b>{{agenda.alumno.matricula}}</h5>
            </div>
            <div class="col-12 mt-3 text-left">
              <h6><b>ALUMNO (A): </b>{{agenda.alumno.nombre}}</h6>
            </div>
            <div class="col-md-6 text-left">
              <h6><b>Día: </b>
              {{agenda.dia.dia}}</h6>
            </div>
            <div class="col-md-6 text-left">
              <h6><b>Hora: </b>
              {{agenda.hora.hora}}</h6>
            </div>
            <div class="col-12 mt-3 text-left">
              <h6>
                
                Generó su cita para el material correspondiente al Semestre
                <b>
                Agosto-Enero 2021
                </b>
                  , requisito <b>indispensable</b> para recoger su material.
                
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <button v-on:click="Imprimir">Imprimir</button>
        </div>
      </div>
    </div>
    <nav 
      style="background-color:rgb(231 233 234) !important;" 
      class="navbar text-center container-fluid fixed-bottom pb-3">
      <small class="mx-auto">
        <a 
          v-on:click.prevent="Salir"
          href="" 
          class="btn-link">
          Salir
        </a>
      </small>
    </nav>
  </div>
</template>  

<script>
export default {
  data(){
    return {
      agenda:{
        dia:{
          dia:''
        },
        hora:{
          hora:''
        },
        alumno:{
          nombre:''
        }
      }
    }
  },
  methods:{
    Imprimir(){
      window.print();
    },
    Salir(){
      this.$router.push({name:'Login'});
    }
  },
  created(){
    this.agenda=this.$route.params.agenda;
  },
  mounted(){
    $(document).ready(function(){
      window.scrollTo(0, 0);
    });
    console.log(this.agenda);
  },
};
</script>