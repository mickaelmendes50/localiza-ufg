<template>
  <div class="panel">
    <h3>Andar</h3>
    <select v-model="selectedFloor" @change="onFloorChange">
      <option disabled value="">Escolha o andar...</option>
      <option v-for="f in floors" :key="f.id" :value="f.id">
        {{ f.name }}
      </option>
    </select>

    <h3>Sala/Destino</h3>
    <select v-model="selectedDestination" :disabled="!selectedFloor">
      <option disabled value="">Escolha o destino...</option>
      <option v-for="d in availableDestinations" :key="d.id" :value="d.id">
        {{ d.name }}
      </option>
    </select>

    <button
        class="btn-navigate"
        :disabled="!selectedDestination"
        @click="navigate">
      <span class="btn-icon">🧭</span>
      Calcular Rota
    </button>

    <button
        v-if="selectedDestination"
        class="btn-clear"
        @click="clear">
      Limpar
    </button>

    <!-- Info do destino selecionado -->
    <div v-if="selectedDestination" class="destination-info">
      <div class="info-label">Destino:</div>
      <div class="info-value">
        {{ availableDestinations.find(d => d.id === selectedDestination)?.name }}
      </div>
      <div class="info-label" style="margin-top: 8px">Andar:</div>
      <div class="info-value">
        {{ floors.find(f => f.id === selectedFloor)?.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { floors, getDestinations } from "../data/graph";

const emit = defineEmits<{
  navigate: [destination: string, floorId: string];
  clear: [];
}>();

// Inicializa com o primeiro andar disponível
const selectedFloor = ref<string>(floors[0]?.id || "");
const selectedDestination = ref<string>("");

// Busca destinos disponíveis no andar selecionado
const availableDestinations = computed(() => {
  if (!selectedFloor.value) return [];
  return getDestinations(selectedFloor.value);
});

function onFloorChange() {
  // Limpa o destino quando trocar de andar
  selectedDestination.value = "";
  emit("clear");
}

function navigate() {
  if (!selectedDestination.value || !selectedFloor.value) return;
  emit("navigate", selectedDestination.value, selectedFloor.value);
}

function clear() {
  selectedDestination.value = "";
  emit("clear");
}

// Reset destination se não estiver disponível no andar atual
watch(availableDestinations, (newDests) => {
  if (selectedDestination.value &&
      !newDests.some(d => d.id === selectedDestination.value)) {
    selectedDestination.value = "";
  }
});
</script>

<style scoped>
.panel {
  width: 280px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow:
      0 20px 60px rgba(0,0,0,0.12),
      0 0 0 1px rgba(0,0,0,0.05);
}

.panel h3 {
  margin: 20px 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.panel h3:first-child {
  margin-top: 0;
}

.panel select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #111827;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.panel select:hover:not(:disabled) {
  border-color: #3b82f6;
}

.panel select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.panel select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f9fafb;
}

.btn-navigate,
.btn-clear {
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-navigate {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-navigate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.btn-navigate:active:not(:disabled) {
  transform: translateY(0);
}

.btn-navigate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  background: #9ca3af;
}

.btn-clear {
  background: #f3f4f6;
  color: #6b7280;
  margin-top: 8px;
}

.btn-clear:hover {
  background: #e5e7eb;
  color: #374151;
}

.btn-icon {
  font-size: 18px;
}

.destination-info {
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 10px;
  border: 2px solid #86efac;
}

.info-label {
  font-size: 11px;
  font-weight: 600;
  color: #166534;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  font-weight: 700;
  color: #15803d;
  margin-top: 2px;
}
</style>
