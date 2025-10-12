<template>
  <div class="panel">
    <h3>Andar</h3>
    <select v-model="selected">
      <option disabled value="">Escolha...</option>
      <option v-for="f in floors" :key="f" :value="f">{{ f }}</option>
    </select>

    <h3>Sala</h3>
    <select v-model="selected">
      <option disabled value="">Escolha...</option>
      <option v-for="d in destinations" :key="d" :value="d">{{ d }}</option>
    </select>
    <button :disabled="!selected" @click="$emit('navigate', selected)">Calcular rota</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {destinations, floors} from "../data/graph";
const selected = ref<string>("");
</script>

<style scoped>
.panel{
  width: 220px;
  padding: 12px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}
.panel h3 {
  padding-top: 15px;
  margin: 0 0 8px 0;
  color: #5a5a5a;
}
.panel select, .panel button {
  width: 100%;
  padding: 8px;
  margin-top: 6px;
}
</style>
