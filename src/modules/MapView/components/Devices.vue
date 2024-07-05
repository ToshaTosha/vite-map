<template>
    <yandex-map-marker
        v-for="marker in test"
        :key="marker.iconSrc"
        position="top-center left-center"
        :settings="{ coordinates: marker.coordinates }"
    >
        <div class="pin">
            <Icon :icon="'lucide:radio'" :color="'#ffffff'" class="size-4" />
        </div>
    </yandex-map-marker>
</template>
      
<script>

import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'
import MapCluster from '@/modules/MapView/components/MapCluster.vue'
import { Icon } from '@iconify/vue'

export default {
  name: 'Devices',
  components: {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    MapCluster,
    YandexMapMarker,
    Icon,
  },
  data() {
    return { 
      center: [this.$store.state.currentCity.longitude, this.$store.state.currentCity.latitude],
      zoom: 3,
      test: [
    {
        coordinates: [37.623, 55.752],
    },
    {
        coordinates: [38.125, 55.622],
    },
    {
        coordinates: [37.295, 55.415],
    },
  ]
    }
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
