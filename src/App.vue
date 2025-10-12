<template>
  <div class="app-shell">
    <MapView :destination="destination"/>
    <ControlPanel @navigate="(d) => (destination = d)"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapView from "./components/MapView.vue";
import ControlPanel from "./components/ControlPanel.vue";
const destination = ref<string | null>(null);
</script>

<style>
.app-shell{
  min-height: 100vh;
  display:flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  padding: 32px;
}
</style>
