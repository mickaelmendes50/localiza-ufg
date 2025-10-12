<template>
  <div class="relative w-full max-w-[900px] h-auto">
    <img
        ref="image"
        src="/floorplan.png"
        alt="Planta"
        class="w-full h-auto object-contain"
        @load="setupCanvas"
    />
    <canvas
        ref="canvas"
        class="absolute top-0 left-0 w-full h-full pointer-events-none"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from "vue";
import { nodes, edges } from "../data/graph";

const props = defineProps<{ destination: string | null }>();
const canvas = ref<HTMLCanvasElement | null>(null);
const image = ref<HTMLImageElement | null>(null);

let scaleX = 1;
let scaleY = 1;

// Define rota (entrada -> destino)
function findPath(destination: string): string[] {
  const queue: string[][] = [["entrada"]];
  const visited = new Set<string>();

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

function drawRoute(route: string[]) {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx || !image.value) return;

  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height);

  // desenhar rota
  if (route.length > 1) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.beginPath();

    const start = nodes[route[0]];
    ctx.moveTo(start.x * scaleX, start.y * scaleY);
    for (let i = 1; i < route.length; i++) {
      const point = nodes[route[i]];
      ctx.lineTo(point.x * scaleX, point.y * scaleY);
    }
    ctx.stroke();
  }

  // desenhar nós (debug visual)
  for (const [id, point] of Object.entries(nodes)) {
    ctx.beginPath();
    ctx.arc(point.x * scaleX, point.y * scaleY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = id === "entrada" ? "green" : "blue";
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "12px sans-serif";
    ctx.fillText(id, point.x * scaleX + 8, point.y * scaleY - 4);
  }
}

function setupCanvas() {
  nextTick(() => {
    if (!canvas.value || !image.value) return;
    const rect = image.value.getBoundingClientRect();
    canvas.value.width = rect.width;
    canvas.value.height = rect.height;

    // Calcula escala com base nas dimensões originais da planta (1200x900)
    scaleX = rect.width / 1200;
    scaleY = rect.height / 900;

    // Desenha pontos base (sem rota)
    drawRoute([]);
  });
}

watch(
    () => props.destination,
    (dest) => {
      if (!dest) return;
      const route = findPath(dest);
      drawRoute(route);
    }
);

onMounted(() => {
  setupCanvas();
});
</script>
