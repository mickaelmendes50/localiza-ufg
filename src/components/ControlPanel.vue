<template>
  <div class="p-4 bg-white rounded-2xl shadow-md space-y-2">
    <h2 class="font-semibold text-lg">Escolha o destino</h2>
    <select v-model="selected" class="border p-2 rounded w-full">
      <option disabled value="">Selecione...</option>
      <option v-for="d in destinations" :key="d" :value="d">{{ d }}</option>
    </select>
    <button
        class="bg-blue-600 text-white px-3 py-2 rounded w-full"
        @click="$emit('navigate', selected)"
        :disabled="!selected"
    >
      Calcular rota
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { destinations } from "../data/graph";

const selected = ref("");
</script>
