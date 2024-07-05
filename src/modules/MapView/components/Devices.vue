<template>
  <yandex-map-marker
    v-for="marker in devicesOptions"
    :key="marker.iconSrc"
    position="top-center left-center"
    :settings="{ coordinates: [marker.longitude, marker.latitude] }"
  >
    <div class="pin">
      <Icon :icon="'lucide:radio'" :color="'#ffffff'" class="size-4" />
    </div>
  </yandex-map-marker>
</template>
      
<script>

import { YandexMapMarker } from 'vue-yandex-maps'
import { DevicesApi } from '../api/DevicesApi';
import { Icon } from '@iconify/vue'

export default {
  name: 'Devices',
  components: {
    YandexMapMarker,
    Icon,
  },
  data() {
    return {
      devicesOptions: []
    }
  },
  created() {
    this.fetchDevices()
  },
  methods: {
    async fetchDevices () {
      try {
        const api = new DevicesApi()
        const response = await api.getAll()
        this.devicesOptions = response.data
      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>
.pin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #ffbf00;
}
</style>
