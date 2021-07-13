<template>
	<div class="row justify-content-center">
  	<div class="col-md-6 px-0 text-center">
    		<div class="card card-signin my-5" style="border-radius:.5rem !important;">
          	<div class="card-body w-md-75 mx-auto">
	            <h5 class="card-title text-center">Iniciar Sesión</h5>
	            <form
                v-on:submit.prevent="ConsultarMatricula"
	            	autocomplete="off" 
	            	class="form-signin">
	              <div class="form-label-group">
	                <input
                    :disabled="cargando"
	                	type="text" 
	                	id="matricula"
                    v-model="matricula" 
	                	class="form-control" placeholder="Matricula" />
	                <label for="matricula">Matricula</label>
	              </div>
	              <div class="form-label-group">
	                <input
                    :disabled="cargando"  
	                	type="text"
                    v-model="folio_electronico" 
	                	id="folio" 
	                	class="form-control" 
	                	placeholder="Folio Electrónico" />
	                <label for="folio">Folio Electrónico</label>
	              </div>
	              <a
	              	href=""
                  :class="{'disabled':cargando}"
                  v-on:click.prevent="EjemploPago" 
	              	class="my-3 btn-link text-primary">
	                ¿Cual es mi folio electrónico?
	              </a>
                <br>
                <a
                  href=""
                  :class="{'disabled':cargando}"
                  v-on:click.prevent="PorqueNoFunciona" 
                  class="my-3 btn-link text-primary">
                  ¿Porque no funciona mi folio electrónico?
                </a>
                <button 
                  :disabled="cargando"
                  class="mt-4 btn btn-lg btn-success btn-block text-uppercase" 
                  type="submit">
                  <span 
                    v-if="cargando"
                    class="spinner-border spinner-border-sm" 
                    role="status" 
                    aria-hidden="true" />
                  Entrar
                </button>
	            </form>
          	</div>
      	</div>
  	</div>
    <div class="col-12 mt-3 text-center">
      <h5>Horario de Atención del chat Lunes a Viernes de 8:00am  a 6:00 pm</h5>
    </div>
    <div class="modal" id="modal_ejemplo_pago" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ejemplo Folio Electrónico</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-md-8 px-0 text-center">
                <img 
                  class="img-fluid" 
                  style="max-height:450px;" src="static/img/ejemplo_folio_pago.jpeg" alt="">
              </div>
              <div class="col-12 my-3 text-center">
                <h4>ó</h4>
              </div>
              <div class="col-md-8 px-0 text-center">
                <img 
                  class="img-fluid" 
                  style="max-height:450px;" src="static/img/ejemplo_folio_pago_facultad.jpeg" alt="">
              </div>
              <div class="col-12 my-3 text-center">
                <h4>ó</h4>
              </div>
              <div class="col-12 px-0 text-center mt-3 text-danger">
                En transferencia electrónica aparece como "CLAVE DE RASTREO"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="porquenofunciona" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Notas del Folio</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-12 mb-3">
                <b>1.</b> El folio electrónico que debes ingresar, debe ser del pago de los libros.
              </div>
              <div class="col-12 mb-3">
                <b>2.</b> Si tu pago fue por depósito, el folio electrónico debe terminar en "3629" o "0000" o "3000"
              </div>
              <div class="col-12 mb-3">
                <b>3.</b> Si tu folio electrónico termina en "3629", reemplaza el "3629" por ceros. Ejemplo: el folio "0265276003629" quedaría de la siguiente manera: "0265276000000"
              </div>
              <div class="col-12 mb-3">
                <b>4.</b> Otra opción si tu folio no funciona y termina en "3629", reemplaza solo el "629" por ceros. Ejemplo: el folio "0265276003629" quedaría de la siguiente manera: "0265276003000"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import {db} from '@/db.js';
export default {
  data () {
    return {
      cargando:false,
      matricula:'',
      folio_electronico:'',
      alumno:{
        id:null,
        nombre:'',
        matricula:''
      },
      folio:{
        id:null,
        folio:''
      }
    }
  },
  methods:{
    EjemploPago(){
      $('#modal_ejemplo_pago').modal();
    },
    PorqueNoFunciona(){
      $('#porquenofunciona').modal();
    },
    Validar(){
      var pasar = true;
      if (this.matricula.length==0) {
        swal('Matricula Obligatoria','','info');
        pasar = false;
      }else if (this.folio_electronico.length==0) {
        swal('Folio Electrónico Obligatorio','','info');
        pasar = false;
      }
      return pasar;
    },
    ConsultarMatricula(){
      var that = this;
      this.cargando=true;
      this.alumno.id=null;
      this.folio.id=null;
      if (!this.Validar()) {
        this.cargando=false;
        return;
      }
      db.collection('alumnos')
      .where('matricula','==',that.matricula)
      .limit(1).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          that.alumno=doc.data();
          that.alumno.id = doc.id;
        });
        if (that.alumno.id!=null) {
          if (that.alumno.folio.id!=null) {
            if (Number(that.alumno.folio.folio)==Number(that.folio_electronico)) {
              that.$router.push({
                name:'Paquete_Libros',
                params:{
                  alumno:that.alumno,
                  folio:that.folio
                }
              });
            }else{
              swal('El folio ingresado anteriorme no concuerda','Anteriorme iniciaste sesión con un folio electrónico que es distinto al que acabas de ingresar','warning');
              that.cargando=false;
            }
          }else{
            that.ConsultarFolio();
          }
        }else{
          that.cargando=false;
          swal('No encontré la matricula','','warning');
        }
      })
      .catch(error=>{
        that.cargando=false;
        swal('Error al Buscar Matricula','Favor de comunicarte con la facultad','error');
      });
    },
    ConsultarFolio(){
      var that = this;
      var folio_buscar = Number(that.folio_electronico);
      var folio_buscar2 = folio_buscar.toString();
      console.log(folio_buscar2);
      db.collection('folios')
      .where('folio','==',folio_buscar2)
      .where('usado','==',false)
      .limit(1).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          that.folio=doc.data();
          that.folio.id = doc.id;
        });
        if (that.folio.id!=null) {
          that.AsignarFolioAlAlumno();
        }else{
          that.cargando=false;
          swal('No encontré el folio electrónico','Suele tardar 24 horas después de realizar el pago','warning');
        }
      })
      .catch(error=>{
        that.cargando=false;
        swal('Error al Buscar Folio','Favor de comunicarte con la facultad','error');
      });
    },
    AsignarFolioAlAlumno(){
      var that = this;
      db.collection('alumnos').doc(that.alumno.id)
      .update({folio:that.folio})
      .then((response) => {
        that.UsarFolio();
      })
      .catch(error=>{
        that.cargando=false;
        swal('Error Asignando Folio','Favor de comunicarte con la facultad','error');
      });
    },
    UsarFolio(){
      var that = this;
      db.collection('folios').doc(that.folio.id)
      .update({usado:true})
      .then((response) => {
        that.$router.push({
          name:'Paquete_Libros',
          params:{
            alumno:that.alumno,
            folio:that.folio
          }
        });
      })
      .catch(error=>{
        that.cargando=false;
        swal('Error en Folio','Favor de comunicarte con la facultad','error');
      });
    },
    Nada(){}
  },
  mounted(){
    $(document).ready(function(){
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style>
a.disabled {
  pointer-events: none;
  cursor: default;
}
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}
@supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
