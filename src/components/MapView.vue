<template>
  <div class="map-wrap">
    <!-- planta "desenhada" com divs CSS -->
    <div class="floorplan" ref="container">
      <!-- rooms as CSS boxes -->
      <div class="room guarita">Guarita</div>
      <div class="room recepcao">Recepção</div>
      <div class="room salaA">Sala A</div>
      <div class="room salaB">Sala B</div>
      <div class="room salaC">Sala C</div>
      <div class="room salaD">Sala D</div>
      <div class="room salaE">Sala E</div>
      <div class="room coordenacao">Coordenação</div>

      <!-- SVG overlay (absolute) -->
      <svg class="overlay" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
        <!-- debug: draw all edges faint -->
        <g stroke="#ddd" stroke-width="10" fill="none">
          <line v-for="(e, i) in edges" :key="'e'+i"
                :x1="px(nodes[e[0]].x)" :y1="py(nodes[e[0]].y)"
                :x2="px(nodes[e[1]].x)" :y2="py(nodes[e[1]].y)" />
        </g>

        <!-- route polyline -->
        <polyline
            v-if="routePoints.length"
            :points="routePoints"
            stroke="red"
            stroke-width="18"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        />

        <!-- nodes -->
        <g v-for="(n, id) in nodes" :key="id">
          <circle v-if="!id.startsWith('corredor')" :cx="px(n.x)" :cy="py(n.y)" r="16" :fill="id==='entrada'? 'green':'#1f6feb'"/>
<!--          <text v-if="id==='entrada'" :x="px(n.x)+22" :y="py(n.y)+6" font-size="32" fill="#111" font-family="sans-serif">{{ id }}</text>-->
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { nodes, edges } from "../data/graph";

const props = defineProps<{ destination: string | null }>();

const container = ref<HTMLElement | null>(null);
const logicalSize = 1000; // matches viewBox 1000 x 1000

// utils to convert relative (0..1) to svg coords (0..1000)
const px = (x: number) => Math.round(x * logicalSize);
const py = (y: number) => Math.round(y * logicalSize);

function findPath(destination: string): string[] {
  const queue: string[][] = [["entrada"]];
  const visited = new Set<string>(["entrada"]);
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

watch(() => props.destination, (d) => {
  if (!d) { currentRoute.value = []; return; }
  currentRoute.value = findPath(d);
});

// routePoints as "x,y x,y"
const routePoints = computed(() => {
  if (!currentRoute.value || currentRoute.value.length < 2) return "";
  return currentRoute.value.map(id => `${px(nodes[id].x)},${py(nodes[id].y)}`).join(" ");
});

onMounted(() => {
  // nothing special needed: SVG scales automatically
});
</script>

<style scoped>
.map-wrap {
  display:flex;
  justify-content:center;
  align-items:center;
  width: 100%;
}
.floorplan{
  position: relative;
  width: 900px;
  aspect-ratio: 4 / 3;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  overflow: hidden;
}

/* rooms (absolute with percentages relative to container) */
.room{
  position: absolute;
  background: #e6eefc;
  border: 2px solid #c7d9fb;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:600;
  color:#123;
  border-radius:8px;
}

/* positions tuned to match nodes (use percent) */
.guarita      { left: 6%;  top: 67%; width: 8%;  height: 20%; }
.recepcao     { left: 15%; top: 67%; width: 26%; height: 20%; }
.coordenacao  { left: 42%; top: 67%; width: 36%; height: 20%; }
.salaA        { left: 6%;  top: 4%;  width: 36%; height: 32%; }
.salaB        { left: 38%; top: 4%;  width: 30%; height: 32%; }
.salaC        { left: 70%; top: 4%;  width: 26%; height: 32%; }
.salaD        { left: 6%;  top: 42%; width: 36%; height: 20%; }
.salaE        { left: 36%; top: 42%; width: 36%; height: 20%; }

/* overlay SVG covers whole container */
.overlay{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* click-through */
}
</style>
