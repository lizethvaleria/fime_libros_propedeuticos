<template>
	<div class="row justify-content-center">
    <div 
      v-if="opcion1=='pdf' && opcion2=='agendar'"
      class="col-12 mt-4 text-center">
       
      
        <b>
        Elige una opción
        </b>
      
    </div>
    <div class="col-md-8 mt-3 px-0 text-success">
      <div class="accordion" id="accordionExample">
        <div 
          v-show="opcion1=='pdf' && disponibles_pdf"
          class="card">
          <div class="card-header row" id="headingOne">
            <div class="col-10">
              <h2 class="mb-0">
                <button 
                  v-on:click="ElegirLibrosPdf"
                  style="text-decoration:none !important;" 
                  class="btn btn-link btn-block text-left" 
                  type="button" >
                  Descargar Libros Electrónicos 
                </button>
              </h2>
            </div>
            <div class="col-2 pt-2 text-primary">
              <i class="fas fa-lg fa-file-pdf"/> 
            </div>
          </div>
          <div 
            :class="{'show':opcion_activa=='pdf'}"
            id="collapseOne" 
            class="collapse" 
            aria-labelledby="headingOne" 
            data-parent="#accordionExample">
            <div class="card-body py-5 px-md-5 text-dark">
              <descargarpdf
                :alumno="$route.params.alumno" 
                v-if="opcion_activa=='pdf'"/>
            </div>
          </div>
        </div>
        <div 
          v-show="
            $route.params.alumno.agenda.dia.id==null
            &&
            opcion2=='agendar'
            && 
            disponibles
          "
          class="card">
          <div class="card-header mb-0 row" id="headingTwo">
            <div class="col-10">
              <h2 class="mb-0">
                <button
                  v-on:click="ElegirRecogerLibros" 
                  style="text-decoration:none !important;"
                  class="btn btn-link btn-block text-left collapsed" 
                  type="button" >
                  Agendar Cita para Recoger Libros
                </button>
              </h2>
            </div>
            <div class="col-2 pt-2 text-primary">
              <i class="ml-auto fas fa-lg fa-book"/>
            </div>
          </div>
          <div 
            :class="{'show':opcion_activa=='agendar'}"
            id="collapseTwo" 
            class="collapse" 
            aria-labelledby="headingTwo" 
            data-parent="#accordionExample">
            <div class="card-body py-5 px-md-5 text-dark">
              <agendardia 
                v-if="opcion_activa=='agendar'" />
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div 
      v-show="$route.params.alumno.agenda.dia.id!=null"
      class="col-12 mt-3 text-center">
      <h5>Usted ya tiene una cita</h5>
      <a 
        v-on:click.prevent="ImprimirDia"
        href="" 
        class="btn-link">
        Imprimir Cita
      </a>
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
import {mapState} from 'vuex';
import AgendarDia from './AgendarDia.vue';
import DescargarPdf from './DescargarPdf.vue';
import {db} from '@/db.js';
export default {
  components:{
    agendardia:AgendarDia,
    descargarpdf:DescargarPdf
  },
  data () {
    return {
      opcion_activa:'',
      opcion1:'pdf',
      opcion2:'agendar',
      disponibles_pdf:true,
      disponibles:true,
      disponibles_json:[]
    }
  },
  methods:{
    ElegirLibrosPdf(){
      var that = this;
      if (this.opcion2=='agendar') {
        swal({
          title: "¿Desea elegir la opción para descargar los libros en pdf?",
          text: "Una vez elegida la opción, no podrá cambiarla",
          icon: "info",
          buttons: {
            cancel: "Cancelar",
            si: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "si":
              that.opcion_activa='pdf';
              that.opcion1='pdf';
              that.opcion2='';
              db.collection('alumnos')
              .doc(that.$route.params.alumno.id)
              .update({tipo_libros:'pdf'})
              .then(response=>{
                console.log('libros en pdf');
                that.DisminuirDisponibles();
              })
              .catch(error=>{
                console.log('error en libros en pdf');
              });
              break;
            default:
              console.log('No agendar');
            break;
          }
        });
      }
    },
    ElegirRecogerLibros(){
      var that = this;
      if (this.opcion1=='pdf') {
        swal({
          title: "¿Desea elegir la opción para recoger los libros en la facultad?",
          text: "Una vez elegida la opción, no podrá cambiarla",
          icon: "info",
          buttons: {
            cancel: "Cancelar",
            si: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "si":
              that.opcion_activa='agendar';
              that.opcion1='';
              that.opcion2='agendar';
              db.collection('alumnos')
              .doc(that.$route.params.alumno.id)
              .update({tipo_libros:'agendar'})
              .then(response=>{
                console.log('libros en fisico');
              })
              .catch(error=>{
                console.log('error en libros en fisico');
              });
              break;
            default:
              console.log('No agendar');
            break;
          }
        });
      }
    },
    DisminuirDisponibles(){
      var that = this;
      console.log('DisminuirDisponibles');
      db.collection('disponibles')
      .doc(that.disponibles_json[0].id)
      .update({
        pdf:Number(that.disponibles_json[0].pdf)-1
      })
      .then(response=>{
        console.log('pdfs disminuidos');
      })
      .catch(error=>{
        console.log('error al disminuir los pdfs disponibles');
      });
    },
    ImprimirDia(){
      this.$router.push({
        name:'ImprimirDia',
        params:{
          alumno:this.$route.params.alumno,
          agenda:this.$route.params.alumno.agenda,
          new:false
        }
      });
    }, 
    ConsultarDisponibles(){
      var that = this;
      that.disponibles_json=[];
      var dato = null;
      db.collection('disponibles').limit(1).get()
      .then(querySpanshot=>{
        dato=null;
        querySpanshot.forEach(doc=>{
          dato=doc.data();
          dato.id=doc.id;
          that.disponibles_json.push(dato);
          if (doc.data().libros<=0) {
            that.disponibles=false;
          }
          if (doc.data().pdf<=0) {
            that.disponibles_pdf=false;
          }
        })
      })
    },
    Salir(){
      this.$router.push({name:'Login'});
    }
  },
  computed:{
    ...mapState(['menu'])
  },
  mounted(){
    $(document).ready(function(){
      window.scrollTo(0, 0);
    });
  },
  created(){
    this.menu.titulo='Material Didáctico';
    if (this.$route.params.alumno==undefined) {
      this.Salir();
    }else{
      this.ConsultarDisponibles();
      if (this.$route.params.alumno.tipo_libros!=undefined) {
        this.opcion_activa=this.$route.params.alumno.tipo_libros;
        if (this.opcion_activa=='pdf') {
          this.opcion1='pdf';
          this.opcion2='';
        }else{
          this.opcion1='';
          this.opcion2='agendar';
        }
      }else{
        this.opcion1='pdf';
        this.opcion2='agendar';
      }
    }
  }
};
</script>

<style>

</style>
