<template>
  <yandex-map-clusterer
    v-model="clusterer"
    :grid-size="2 ** gridSize"
    :trueBounds="trueBounds"
  >
    <yandex-map-marker v-for="marker, id in markers" :key="id"
      zoom-on-cluster-click
      :settings="{ 
        coordinates: [marker.longitude, marker.latitude], 
        properties: { isActive: marker.status, id: marker.id, latitude: marker.latitude, longitude: marker.longitude }, 
        onClick: () => openMarker = id, zIndex: openMarker === id ? 1 : 0 
      }"
      :style="{
        '--background': markerColor(marker.status)
      }"
    >
      <div class="marker" />
    </yandex-map-marker>
    <template #cluster="{ length, clusterer }">
      <div class="pie-marker fade-in" 
        @click="clusterClick($event, clusterer.clusterId)" 
        v-bind:style="{ 
          'z-index': openCluster === clusterer.clusterId ? 999 : 1,
          '--color': '#0E4779',
          '--image': diagramBackgroundCluster(clusterer.features) 
        }"
      >
        {{ length }}
        <div
          v-if="openCluster === clusterer.clusterId"
          class="popup"
        >
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem class="cursor-pointer" v-for="v, id in clusterer.features" :value="v" :key="id" 
                  @click="() => { commit('updateCurrentEditClient', v.properties) }"
                >
                  <div class="text-sm">
                  {{ v.properties.id }}
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </template>
  </yandex-map-clusterer>
</template>
  
<script setup lang="ts">
import {
  YandexMapClusterer,
  YandexMapMarker,
} from 'vue-yandex-maps';
import { ref, shallowRef, watch } from 'vue';
import type { YMapClusterer } from '@yandex/ymaps3-types/packages/clusterer'
import type { LngLatBounds } from '@yandex/ymaps3-types'

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import { useStore } from 'vuex'

const { getters, commit } = useStore()

const currentClients = getters.getCurrentClients

const gridSize = ref(6)
const clusterer = shallowRef<YMapClusterer | null>(null)
const trueBounds = ref<LngLatBounds>([[0, 0], [0, 0]])

interface Marker {
  id: number,
  uid: number,
  latitude: number,
  longitude: number,
  update_date: string,
  status: string,
  group_id: number
}

let markers = ref<Marker[]>(currentClients)

watch(() => getters.getCurrentClients, (newValue) => {
  markers.value = newValue
})

const openMarker = ref<null | number>(null)
let openCluster = ref<null | string>(null)


const diagramBackgroundCluster = (obj) => {
  const gradient: string[] = [];
  let activeCount = 0;
  let notActiveCount = 0;
  let errorCount = 0;

  for (let i = 0; i < obj.length; i += 1) {
    const p = obj[i]
    if (p.properties.isActive === 'active') {
      activeCount += 1;
    } else if (p.properties.isActive === 'unactive') {
      notActiveCount += 1;
    } else if (p.properties.isActive === 'blocked') {
      errorCount += 1;
    }
  }

  const totalCount = activeCount + notActiveCount + errorCount;

  const activeDeg = (activeCount / totalCount) * 360;
  const notActiveDeg = (notActiveCount / totalCount) * 360;
  const errorDeg = (errorCount / totalCount) * 360;

  gradient.push(`#00FF00 ${activeDeg}deg`);
  gradient.push(`#FFA500 ${activeDeg}deg ${(activeDeg + notActiveDeg)}deg`);
  gradient.push(`#FF0000 ${activeDeg + notActiveDeg}deg ${(activeDeg + notActiveDeg + errorDeg)}deg`);

  return `conic-gradient(${gradient.join(', ')})`;
}

const markerColor = (isActive) => {
  if (isActive === 'active') {
    return '#00FF00'
  } else if (isActive === 'unactive') {
    return '#FFA500'
  } else if (isActive === 'blocked') {
    return '#FF0000'
  }
}

const clusterClick = (e, value) => {
  const markers = document.querySelectorAll('.ymaps3x0--marker');
  markers.forEach(marker => {
    if (marker !== e.target.parentElement.parentElement.parentElement) {
      (marker as HTMLElement).style.zIndex = '0'
    }
  })

  if (openCluster.value === value) {
    openCluster.value = null
    return
  }
  
  openCluster.value = value
  if (e.target.parentElement.parentElement.parentElement.style.zIndex === 999) {
    e.target.parentElement.parentElement.parentElement.style.zIndex = 0
  } else {
    e.target.parentElement.parentElement.parentElement.style.zIndex = 999
  }
}

</script>

<style scoped>
  .marker {
    background: var(--background);
    border-radius: 100%;
    width: 25px;
    height: 25px;
  }
  .cluster {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: green;
    color: #fff;
    border-radius: 100%;
    cursor: pointer;
    border: 2px solid limegreen;
    outline: 2px solid green;
    z-index: -1;
  }
  .fade-in {
    animation: fadeIn 0.3s;
  }
  .pie-marker {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: currentColor;
    background-image: var(--image);
    color: #fff;
    border-radius: 100%;
    cursor: pointer;
    z-index: -1;
  }
  .popup {
    position: absolute;
    top: calc(100% + 10px);
    width: 200px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    color: black;
    z-index: 999;
  }
  * {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  form input {
    margin-bottom: 5px;
  }
  input, select, button {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
</style>