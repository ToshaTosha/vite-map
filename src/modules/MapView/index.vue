<template>
  <yandex-map
    :settings="{
      location: {
        center: center,
        zoom: zoom,
      },
    }"
    height="100vh"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <MapCluster />
    <Devices v-if="$store.state.isDevicesView"/>
  </yandex-map>
</template>
    
<script>

import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'
import MapCluster from '@/modules/MapView/components/MapCluster.vue'
import Devices from '@/modules/MapView/components/Devices.vue'

export default {
  name: 'MapView',
  components: {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    MapCluster,
    YandexMapMarker,
    Devices,
  },
  data() {
    return { 
      center: [this.$store.state.currentCity.longitude, this.$store.state.currentCity.latitude],
      zoom: this.$store.state.currentCity.zoom,
    }
  },
  methods: {
    updateMapSettings() {
      this.center = [this.$store.state.currentCity.longitude, this.$store.state.currentCity.latitude]
      this.zoom = this.$store.state.currentCity.zoom
    }
  },
  watch: {
    '$store.getters.getCurrentCity': {
      handler: 'updateMapSettings',
    }
  },
}
</script>

<style scoped>
.pin {
  cursor: pointer;
  max-width: unset;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
</style>
