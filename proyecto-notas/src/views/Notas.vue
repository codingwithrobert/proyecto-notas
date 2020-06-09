<template>
  <div>
    <div class="notas-container">
      <h2>Hola</h2>
      <h4>Puedes crear tus notas a cotinuacion:</h4>
      <!------------------------------------------------- Formulario -------------------------------------------->
      <form>
        <label for="texto">Texto de la nota:</label>
        <br />
        <textarea name="texto" id="textarea" cols="40" rows="10" v-model="texto"></textarea>
        <br />
        <button @click="addNote()">CREAR NOTA</button>
      </form>

      <!------------------------------------------------- FIN Formulario ---------------------------------------->
      <!------------------------------------------------- Notas ------------------------------------------------->
      <h2>Notas</h2>
      <p>Actualizando notas</p>
      <input v-model="newText" placeholder="texto saldra aqui" />
      <button>ACTUALIZAR</button>
      <br />
      <br />
      <notas :notas="notas" v-on:editar="showEditText" />
      <!------------------------------------------------- FIN Notas --------------------------------------------->
    </div>
  </div>
</template>

<script>
// Importamos modulos y componentes requeridos
import axios from 'axios';
import notas from '@/components/ShowNotas.vue';
export default {
  name: 'Notas',
  components: { notas },
  data() {
    return {
      // Variable de almacenamiento del texto
      texto: '',
      // Variable de almacenamiento del texto
      notas: [],
      // Nuevo texto de la nota
      newText: '',
      id: null
    };
  },
  methods: {
    ///////////// FUNCION AÑADIR NOTAS
    addNote() {
      // Variable con problemas en axios y reconvertimos a self para poder acceder a determinados datos
      var self = this;
      axios
        .post('http://localhost:3000/notas/add', {
          texto: self.texto
        })
        // Imprime respuesta en consola
        .then(response => console.log(response))
        // Imprime error en la consola si lo hubiera
        .catch(error => console.log(error));
    },
    // Funcion para listar notas
    getNotes() {
      var self = this;
      axios
        .get('http://localhost:3000/notas')
        // Si la peticion es 200 (ok) que se llene el array de notas
        .then(response => (self.notas = response.data))
        // de lo contrario tirame un error
        .catch(error => console.log(error));
    },
    showEditText(data) {
      this.newText = data.texto;
      this.id = data.id;
    }
    // Cuando la web se cargue llamamos a las funciones con CREATED()
  },
  created() {
    // Llamo a  getNotes en cuanto la pagina se crea
    this.getNotes();
  }
};
</script>
