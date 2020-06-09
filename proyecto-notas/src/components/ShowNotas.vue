<template>
  <div class="shownotas-container">
    <div class="notas" v-for="nota in notas" :key="nota.id">
      {{ nota.texto }}
      <button @click="editNoteEvent(index)">EDITAR</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowNotas',
  props: {
    //variable a bindear en vista
    notas: Array
  },
  methods: {
    editNoteEvent(index) {
      // Guardando info nota en data
      let data = this.notas[index];
      // enviando info a view
      this.$emit('editar', data);
    }
  }
};
</script>

<style></style>
