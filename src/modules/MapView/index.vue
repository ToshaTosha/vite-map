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
    <Devices />
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
import Devices from '@/modules/MapView/components/Devices.vue';
import { Icon } from '@iconify/vue'

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
      zoom: 3,
      test: [
    {
        coordinates: [37.623, 55.752],
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png',
    },
    {
        coordinates: [38.125, 55.622],
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/purple-capybara.png',
    },
    {
        coordinates: [37.295, 55.415],
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/green-capybara.png',
    },
  ]
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
