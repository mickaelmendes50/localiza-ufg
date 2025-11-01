<template>
  <div class="map-wrap">
    <div class="floorplan" ref="container">
      <!-- Indicador do andar atual -->
      <div class="floor-indicator">
        {{ currentFloor?.name || 'Andar' }}
      </div>

      <!-- Salas como divs CSS (apenas as com label) -->
      <div v-for="(node, id) in visibleRooms"
           :key="id"
           :class="['room', { 'room-highlight': id === destination }]"
           :style="getRoomStyle(node)">
        {{ node.label }}
      </div>

      <!-- SVG overlay -->
      <svg class="overlay" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
        <!-- Corredores (cinza claro) -->
        <g stroke="#ddd" stroke-width="8" fill="none" opacity="0.5">
          <line v-for="(e, i) in currentEdges" :key="'e'+i"
                :x1="px(currentNodes[e[0]]!.x)"
                :y1="py(currentNodes[e[0]]!.y)"
                :x2="px(currentNodes[e[1]]!.x)"
                :y2="py(currentNodes[e[1]]!.y)" />
        </g>

        <!-- Rota calculada -->
        <polyline
            v-if="routePoints.length"
            :points="routePoints"
            stroke="#f43f5e"
            stroke-width="16"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.9"
        />

        <!-- Animação de "fluxo" na rota -->
        <polyline
            v-if="routePoints.length"
            :points="routePoints"
            stroke="white"
            stroke-width="4"
            fill="none"
            stroke-linecap="round"
            stroke-dasharray="20 20"
            opacity="0.7"
            class="route-flow"
        />

        <!-- Nós importantes -->
        <g v-for="(n, id) in currentNodes" :key="id">
          <g v-if="!id.startsWith('corredor')">
            <!-- Círculo do nó -->
            <circle
                :cx="px(n.x)"
                :cy="py(n.y)"
                :r="getNodeRadius(id)"
                :fill="getNodeColor(id)"
                :class="{ 'pulse': id === destination }"
            />

            <!-- Ícone de entrada -->
            <text v-if="id === 'entrada'"
                  :x="px(n.x)"
                  :y="py(n.y) + 6"
                  text-anchor="middle"
                  font-size="20"
                  fill="white">
              🚪
            </text>

            <!-- Ícone de destino -->
            <text v-if="id === destination"
                  :x="px(n.x)"
                  :y="py(n.y) + 8"
                  text-anchor="middle"
                  font-size="24"
                  fill="white">
              📍
            </text>
          </g>
        </g>
      </svg>

      <!-- Informações da rota -->
      <div v-if="routeInfo" class="route-info">
        <div class="route-info-content">
          <span class="route-icon">🧭</span>
          <div>
            <div class="route-distance">~{{ routeInfo.distance }}m</div>
            <div class="route-steps">{{ routeInfo.steps }} conexões</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { floors } from "../data/graph";

const props = defineProps<{
  destination: string | null;
  floorId: string;
}>();

const container = ref<HTMLElement | null>(null);
const logicalSize = 1000;

const px = (x: number) => Math.round(x * logicalSize);
const py = (y: number) => Math.round(y * logicalSize);

// Floor atual
const currentFloor = computed(() =>
    floors.find(f => f.id === props.floorId)
);

const currentNodes = computed(() => currentFloor.value?.nodes || {});
const currentEdges = computed(() => currentFloor.value?.edges || []);

// Apenas salas com label para visualização
const visibleRooms = computed(() => {
  return Object.fromEntries(
      Object.entries(currentNodes.value).filter(([_, node]) => node.label)
  );
});

// Pathfinding BFS
function findPath(destination: string): string[] {
  const nodes = currentNodes.value;
  const edges = currentEdges.value;

  if (!nodes.entrada && !nodes.escada) {
    console.warn("Nenhum ponto de entrada encontrado no andar");
    return [];
  }

  const startNode = nodes.entrada ? "entrada" : "escada";

  if (!nodes[destination]) {
    console.warn(`Destino ${destination} não encontrado no andar`);
    return [];
  }

  const queue: string[][] = [[startNode]];
  const visited = new Set<string>([startNode]);

  while (queue.length) {
    const path = queue.shift()!;
    const last = path[path.length - 1];

    if (last === destination) return path;

    for (const [a, b] of edges) {
      if (a === last && !visited.has(b)) {
        visited.add(b);
        queue.push([...path, b]);
      } else if (b === last && !visited.has(a)) {
        visited.add(a);
        queue.push([...path, a]);
      }
    }
  }
  return [];
}

const currentRoute = ref<string[]>([]);

watch([() => props.destination, () => props.floorId], ([dest]) => {
  if (!dest) {
    currentRoute.value = [];
    return;
  }
  currentRoute.value = findPath(dest);
}, { immediate: true });

const routePoints = computed(() => {
  if (currentRoute.value.length < 2) return "";
  return currentRoute.value
      .map(id => `${px(currentNodes.value[id]!.x)},${py(currentNodes.value[id]!.y)}`)
      .join(" ");
});

// Informações da rota
const routeInfo = computed(() => {
  if (currentRoute.value.length < 2) return null;

  let distance = 0;
  for (let i = 0; i < currentRoute.value.length - 1; i++) {
    const n1 = currentNodes.value[currentRoute.value[i]!];
    const n2 = currentNodes.value[currentRoute.value[i + 1]!];
    const dx = (n2!.x - n1!.x) * 50; // Escala aproximada (50m por unidade)
    const dy = (n2!.y - n1!.y) * 50;
    distance += Math.sqrt(dx * dx + dy * dy);
  }

  return {
    distance: Math.round(distance),
    steps: currentRoute.value.length - 1,
  };
});

// Helpers de estilo
function getNodeColor(id: string): string {
  if (id === 'entrada') return '#10b981'; // verde
  if (id === props.destination) return '#f43f5e'; // vermelho
  return '#3b82f6'; // azul
}

function getNodeRadius(id: string): number {
  if (id === 'entrada' || id === props.destination) return 20;
  return 14;
}

function getRoomStyle(node: { x: number; y: number }) {
  return {
    left: `${node.x * 100}%`,
    top: `${node.y * 100}%`,
  };
}
</script>

<style scoped>
.map-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.floorplan {
  position: relative;
  width: 900px;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow:
      0 20px 60px rgba(0,0,0,0.12),
      0 0 0 1px rgba(0,0,0,0.05);
  overflow: hidden;
}

.floor-indicator {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 16px;
  background: rgba(255,255,255,0.95);
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 10;
}

.room {
  position: absolute;
  background: linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%);
  border: 2px solid #93c5fd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #1e40af;
  border-radius: 10px;
  font-size: 11px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-50%, -50%);
  padding: 8px;
  min-width: 60px;
  min-height: 40px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.room-highlight {
  background: linear-gradient(135deg, #fecdd3 0%, #fed7d7 100%);
  border-color: #f43f5e;
  color: #be123c;
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.2);
  transform: translate(-50%, -50%) scale(1.05);
  z-index: 5;
}

.overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.route-flow {
  animation: dash 2s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -40;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.route-info {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.98);
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  z-index: 10;
}

.route-info-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.route-icon {
  font-size: 24px;
}

.route-distance {
  font-weight: 700;
  font-size: 16px;
  color: #111827;
}

.route-steps {
  font-size: 12px;
  color: #6b7280;
}
</style>
