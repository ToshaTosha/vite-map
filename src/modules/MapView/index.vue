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
  </yandex-map>
</template>
    
<script>
  import {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
  } from 'vue-yandex-maps'
  import MapCluster from '@/modules/MapView/components/MapCluster.vue'
export default {
    name: 'MapView',
    components: {
      YandexMap,
      YandexMapDefaultFeaturesLayer,
      YandexMapDefaultSchemeLayer,
      MapCluster,
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
