<template>
  <Header />
  <div class="app-shell">
    <MapView :destination="destination" :floor-id="currentFloor" />
    <ControlPanel
        @navigate="handleNavigate"
        @clear="handleClear"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapView from "./components/MapView.vue";
import ControlPanel from "./components/ControlPanel.vue";
import Header from "./components/Header.vue";

const destination = ref<string | null>(null);
const currentFloor = ref<string>("terreo"); // Começa no térreo

function handleNavigate(dest: string, floor: string) {
  currentFloor.value = floor;
  destination.value = dest;
}

function handleClear() {
  destination.value = null;
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  gap: 32px;
  align-items: self-start;
  justify-content: center;
  padding: 40px 20px;
}

@media (max-width: 1200px) {
  .app-shell {
    flex-direction: column;
    padding: 20px;
  }
}
</style>
