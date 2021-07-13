<template>
  <div class="row mb-3">
    <div class="col-12">
      Al elegir los libros en físico, tendrás que acudir a la Facultad a recogerlos en el dia y hora programados.
    </div>
    <div class="col-12 px-md-0 mt-3 text-center">
      <div class="row">
        <div class="input-group mb-3 col-md-7">
          <div class="input-group-prepend">
            <label class="input-group-text" for="dia">
              Día
              <span 
                v-if="cargando_dias"
                class="ml-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </label>
          </div>
          <select 
            v-on:change="ConsultarHoras"
            :disabled="cargando_dias || cargando"
            v-model="dia.id"
            class="custom-select" id="dia">
            <option value="null">Elige Dia</option>
            <option 
              v-bind:value="option.id"
              v-for="option of dias">
              {{option.dia}}
            </option>
          </select>
        </div>
        <div class="pl-md-0 input-group mb-3 col-md-5">
          <div class="input-group-prepend">
            <label class="input-group-text" for="hora">
              Hora
              <span 
                v-if="cargando_horas"
                class="ml-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </label>
          </div>
          <select 
            v-model="hora.id"
            :disabled="cargando_dias || cargando_horas || cargando"
            class="custom-select" id="hora">
            <option value="null">Elige Hora</option>
            <option
              :disabled="hour.agendados>=hour.cupo" 
              :value="hour.id"
              v-for="hour of horas">
              {{hour.hora}}
              {{hour.agendados>=hour.cupo ? '(Lleno)' : ''}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-12 text-center mt-3">
      <button
        v-on:click="Agendar" 
        :disabled="
          cargando_horas || 
          cargando_dias ||
          dia.id==null || 
          hora.id==null
        "
        class="btn btn-sm btn-primary">
        <i 
          v-if="!cargando"
          class="fas fa-clock"/> 
        <span 
          v-if="cargando"
          class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Agendar Día
      </button>
    </div>
  </div>
</template>

<script>
import {db} from '@/db.js';
export default {
  data(){
    return {
      disponibles:[],
      dia:{
        id:null,
        dia:''
      },
      hora:{
        id:null,
        hora:'',
        cupo:4,
        agendados:0
      },
      dias:[],
      horas:[],
      cargando:false,
      cargando_dias:true,
      cargando_horas:false
    }
  },
  methods:{
    Agendar(){
      var that =this;
      if (!this.Validar()) {return;}
      var dia = null;
      var hora = null;
      for (var i = 0; i < this.dias.length; i++) {
        if (this.dias[i].id==this.dia.id) {
          dia=this.dias[i];
        }
      }
      for (var i = 0; i < this.horas.length; i++) {
        if (this.horas[i].id==this.hora.id) {
          hora=this.horas[i];
        }
      }
      swal({
        title: "¿Desea Agendar este día?",
        text: dia.dia+" "+hora.hora,
        icon: "warning",
        buttons: {
          cancel: "Cancelar",
          si: true,
        },
      })
      .then((value) => {
        switch (value) {
          case "si":
            that.SiAgendar();
            break;
          default:
            console.log('No agendar');
          break;
        }
      });
    },
    SiAgendar(){
      var that = this;
      this.cargando=true;
      var dia = null;
      var hora = null;
      for (var i = 0; i < this.dias.length; i++) {
        if (this.dias[i].id==this.dia.id) {
          dia=this.dias[i];
        }
      }
      for (var i = 0; i < this.horas.length; i++) {
        if (this.horas[i].id==this.hora.id) {
          hora=this.horas[i];
        }
      }
      var agenda = {
        alumno:that.$route.params.alumno,
        dia:dia,
        hora:hora,
        estatus:'Pendiente',
        cargando:false
      };
      db.collection('agenda').add(agenda).then(docRef=>{
        that.QuitarCupoAlaHora(agenda);
      }).catch(error=>{
        that.cargando=false;
        swal('Problemas para agendar el dia','Favor de comunicarse ala facultad','error');
      });
    },
    QuitarCupoAlaHora(agenda){
      var that = this;
      var dia = null;
      var hora = null;
      for (var i = 0; i < this.dias.length; i++) {
        if (this.dias[i].id==this.dia.id) {
          dia=this.dias[i];
        }
      }
      for (var i = 0; i < this.horas.length; i++) {
        if (this.horas[i].id==this.hora.id) {
          hora=this.horas[i];
        }
      }
      db.collection('dias').doc(dia.id)
      .collection('horas').doc(hora.id)
      .update({
        agendados:hora.agendados+1
      })
      .then(response=>{
        that.DisminuirDisponibles(agenda);
      })
      .catch(error=>{
        that.cargando=false;
        swal('Problemas para agendar la hora','Favor de comunicarse ala facultad','error');
      });
    },
    DisminuirDisponibles(agenda){
      var that = this;
      console.log(that.disponibles);
      db.collection('disponibles')
      .doc(that.disponibles[0].id)
      .update({
        libros:that.disponibles[0].libros-1
      })
      .then(response=>{
        that.AsignarAgendaAAlumno(agenda);
      })
      .catch(error=>{
        that.cargando=false;
        swal('Problemas para agendar tu hora','Favor de comunicarse ala facultad','error');
      });
    },
    AsignarAgendaAAlumno(agenda){
      var that = this;
      db.collection('alumnos')
      .doc(that.$route.params.alumno.id)
      .update({
        agenda:agenda
      })
      .then(response=>{
        that.$router.push({
          name:'ImprimirDia',
          params:{
            agenda:agenda,
            new:true
          }
        });
      })
      .catch(error=>{
        that.cargando=false;
        swal('Problemas para agendar tu hora','Favor de comunicarse ala facultad','error');
      });
    },
    Validar(){
      var pasar =true;
      if (this.disponibles.length==0) {
        swal('No hay libros disponibles','','info');
        pasar =false;
      }else if (this.disponibles[0].libros<=0) {
        swal('Ya no hay libros disponibles','','info');
        pasar =false;
      }else if (this.dia==null) {
        swal('Dia obligatorio','','info');
        pasar =false;
      }else if (this.dia==null) {
        swal('Hora obligatoria','','info');
        pasar =false;
      }
      return pasar;
    },
    ConsultarDias(){
      var that = this;
      this.dias=[];
      this.dia.id=null;
      this.cargando_dias=true;
      db.collection('dias').orderBy('fecha','asc')
      .get().then(querySnapshot=>{
        var dato = null;
        querySnapshot.forEach((doc)=>{
          dato = null;
          dato=doc.data();
          dato.id=doc.id;
          that.dias.push(dato);
        });
      })
      .catch(error=>{
        swal('No es posible consultar los dias disponibles','Favor de comunicarse ala facultad','error');
      })
      .finally(response=>{
        that.cargando_dias=false;
      });
    },
    ConsultarHoras(){     
      var that = this;
      var dia = null;
      for (var i = 0; i < this.dias.length; i++) {
        if (this.dias[i].id==this.dia.id) {
          dia=this.dias[i];
        }
      }
      this.horas=[];
      this.hora.id=null;
      this.cargando_horas=true;
      this.$bind(
        'horas',
        db.collection('dias').doc(dia.id)
        .collection('horas').orderBy('fecha','asc')
      )
      .then(projects=>{
        that.cargando_horas=false;
      }).catch(error=>{
        swal('No es posible consultar las horas disponibles','Favor de comunicarse ala facultad','error');
      })
      /*
      db.collection('dias').doc(that.dia.id)
      .collection('horas').orderBy('fecha','asc')
      .get()
      .then(querySnapshot=>{
        var dato = null;
        querySnapshot.forEach((doc)=>{
          dato = null;
          dato=doc.data();
          dato.id=doc.id;
          that.horas.push(dato);
        });
        for (var i = 0; i < that.horas.length; i++) {
          if (that.horas[i].cupo>that.horas[i].agendados) {
            that.hora=that.horas[i];
            break;
          }
        }
      })
      .catch(error=>{
        swal('No es posible consultar las horas disponibles','Favor de comunicarse ala facultad','error');
      })
      .finally(response=>{
        that.cargando_horas=false;
      });
      */
    },
  },
  firestore: {
    disponibles: db.collection('disponibles'),
  },
  created(){
    this.ConsultarDias();
  }
};
</script>