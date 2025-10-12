<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
    <MapView :destination="destination" />
    <ControlPanel @navigate="(d) => (destination = d)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapView from "./components/MapView.vue";
import ControlPanel from "./components/ControlPanel.vue";

const destination = ref<string | null>(null);
</script>

<style>
body {
  font-family: system-ui, sans-serif;
}
</style>
