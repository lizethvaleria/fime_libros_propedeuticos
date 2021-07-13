<template>
  <div class="row mb-5">
    <div class="col-12">
      Al elegir los libros en electrónico, no tendrás que acudir a la Facultad y podrás descargarlos cuando los necesites. 
    </div>
    <div class="col-12 mt-5">
      <b>Paso 1: </b> Descarga los siguientes problemarios
    </div>
    <div class="col-md-3 mt-3 text-center">
      <a 
        target="_blank" 
        href="https://www.fime.uanl.mx/wp-content/uploads/2020/08/PROBLEMARIO-DE-MATEMATICAS.pdf"
        download="PROBLEMARIO-DE-MATEMATICAS.pdf" 
        class="btn btn-block btn-sm btn-primary">
        <i 
          class="fas fa-file-download"/> 
          Matemáticas
      </a>
    </div>
    <div class="col-md-3 mt-3 text-center">
      <a 
        target="_blank" 
        href="https://www.fime.uanl.mx/wp-content/uploads/2020/08/PROBLEMARIO-DE-ALGEBRA-PARA-INGENIERIA.pdf"
        download="PROBLEMARIO-DE-ALGEBRA-PARA-INGENIERIA.pdf" 
        class="btn btn-block btn-sm btn-primary">
        <i 
          class="fas fa-file-download"/> 
          Algebra
      </a>
    </div>
    <div class="col-md-3 mt-3 text-center">
      <a 
        target="_blank" 
        href="https://www.fime.uanl.mx/wp-content/uploads/2020/08/PROBLEMARIO-DE-QUIMICA.pdf"
        download="PROBLEMARIO-DE-QUIMICA.pdf" 
        class="btn btn-block btn-sm btn-primary">
        <i 
          class="fas fa-file-download"/> 
          Química
      </a>
    </div>
    <div class="col-md-3 mt-3 text-center">
      <a 
        target="_blank" 
        href="https://www.fime.uanl.mx/wp-content/uploads/2020/08/laboratoriofisica.pdf"
        download="laboratoriofisica.pdf" 
        class="btn btn-block btn-sm btn-primary">
        <i 
          class="fas fa-file-download"/> 
          Física
      </a>
    </div>
    <div class="col-12 mt-5">
      <b>Paso 2: </b> Descarga los siguientes libros
    </div>
    <div class="col-md-3 mt-3 text-center">
      <a 
        target="_blank" 
        href="https://www.fime.uanl.mx/wp-content/uploads/2020/09/FISICA-I.pdf"
        download="FISICA-I.pdf" 
        class="btn btn-block btn-sm btn-primary">
        <i 
          class="fas fa-file-download"/> 
          Fisica
      </a>
    </div>
    <div class="col-md-3 mt-3 text-center">
      <a 
        target="_blank" 
        href="https://www.fime.uanl.mx/wp-content/uploads/2020/09/PRACTICAS-DE-QUMICA-GENERAL.pdf"
        download="PRACTICAS-DE-QUMICA-GENERAL.pdf" 
        class="btn btn-block btn-sm btn-primary">
        <i 
          class="fas fa-file-download"/> 
          Quimica
      </a>
    </div>
    <div class="col-md-3 mt-3 text-center">
      <a 
        target="_blank" 
        href="https://www.fime.uanl.mx/wp-content/uploads/2020/09/TECNOLOGIAS-DE-INFORMACION.pdf"
        download="TECNOLOGIAS-DE-INFORMACION.pdf" 
        class="btn btn-block btn-sm btn-primary">
        <i 
          class="fas fa-file-download"/> 
          ATI
      </a>
    </div>
    <div class="col-12 mt-5">
      <b>Paso 3: </b> Registrate en la siguiente página y descarga los libros dentro (Primero lee el manual de la página).
    </div>
    <div class="col-12 pl-3 mt-3">
      <ul>
        <li v-if="alumno.email!=undefined">
          Email a utilizar: <b>{{alumno.email}}</b>
        </li>
        <li>
          <a href="./static/pdf/manuabookshelf.pdf" target="_blank" class="btn-link">Ver Manual de la Página</a>
        </li>
        <li>
          <a href="https://bookshelf.vitalsource.com/#/user/registration" target="_blank" class="btn-link">Abrir Página</a>
        </li>
      </ul>
    </div>
    <div class="col-12 mt-5">
      <b>Paso 4: </b> Registrate en la siguiente página y descarga los libros dentro (Primero lee el manual de la página).
    </div>
    <div class="col-12 pl-3 mt-3">
      <ul>
        <li>
          Código a utilizar: <b>{{codigo}}</b>
        </li>
        <li>
          <a href="./static/pdf/manualcodigos.pdf" target="_blank" class="btn-link">Ver Manual de la Página</a>
        </li>
        <li>
          <a href="https://digital.latiendadellibrero.com" target="_blank" class="btn-link">Abrir Página</a>
        </li>
      </ul>
    </div>
    <div class="col-12 my-5">
      <b>Paso 5: </b> ¡Disfruta de tus libros en eléctronico! <br> Si tienes alguna duda o problema puedes hablar por el chat de ayuda que se encuentra en la parte inferior.
    </div>
  </div>
</template>  

<script>
import {db} from '@/db.js';
export default {
  props:['alumno'],
  data(){
    return {
      descargando_quimica:false,
      descargando_fisica:false,
      descargando_matematicas:false,
      codigo:''
    }
  },
  methods:{
    Descargar(libro){
      var that =this;
      var url = null;
      switch(libro){
        case 'matematicas':
          url = 'https://www.fime.uanl.mx/wp-content/uploads/2020/08/MATEMATICAS-PROPEDEUTICO.pdf';
          that.descargando_matematicas=true;
        break;
        case 'fisica':
          url = 'https://www.fime.uanl.mx/wp-content/uploads/2020/08/PROPEDEUTICO-FISICA.pdf';
          that.descargando_fisica=true;
        break;
        case 'quimica':
          url = 'https://www.fime.uanl.mx/wp-content/uploads/2020/08/QUIMICA-GENEAL-PROPEDEUTICO.pdf';
          that.descargando_quimica=true;
        break;
      }
      if (url!=null) {
        switch(libro){
          case 'matematicas':
            that.descargando_matematicas=false;
          break;
          case 'fisica':
            that.descargando_fisica=false;
          break;
          case 'quimica':
            that.descargando_quimica=false;
          break;
        }
        window.open(url);
      }
      /*
      var storage = firebase.storage();
      var pathReference = storage.ref('libros/'+libro+'.pdf').getDownloadURL()
      .then(function(url) {
        that.descargando=false;
        window.open(url);
      }).catch(function(error) {
        switch (error.code) {
          case 'storage/object-not-found':
            swal('Archivos ya no existen','','error');
            break;
          case 'storage/unauthorized':
            swal('Archivos protegidos','','error');
            break;
          case 'storage/canceled':
            swal('Archivos cancelados','','error');
            break;
          case 'storage/unknown':
            swal('Problemas con el servidor','','error');
            break;
        }
      })
      .finally(response=>{
        switch(libro){
          case 'matematicas':
            that.descargando_matematicas=false;
          break;
          case 'fisica':
            that.descargando_fisica=false;
          break;
          case 'quimica':
            that.descargando_quimica=false;
          break;
        }
      });
      */
    },
  },
  created(){
    var that = this;
    console.log(this.alumno);
    console.log(this.alumno.codigo);
    if (this.alumno.codigo==undefined || this.alumno.codigo==null) {
      console.log('consultando codigo');
      var datos = [];
      var dato = null;
      db.collection('codigos')
      .where('usado','==',"false")
      .limit(1).get().then(querySnapshot=>{
        dato = null;
        console.log(querySnapshot);
        querySnapshot.forEach(doc=>{
          console.log(doc.data());
          //that.alumno.codigo=doc.data().codigo;
          dato=doc.data();
          dato.id=doc.id;
          datos.push(dato);
        });
        console.log(datos);
        //console.log(that.alumno.codigo);
        if (datos.length>0) {
          that.codigo=dato.codigo;
          console.log('datos length');
          db.collection('codigos').doc(dato.id).update({
            usado:true
          });
          db.collection('alumnos').doc(that.alumno.id).update({
            codigo:dato.codigo
          });
        }
      });
    }else{
      that.codigo=that.alumno.codigo;
    }
  }
};
</script>