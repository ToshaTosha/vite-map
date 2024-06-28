<template>
    <yandex-map
        :settings="{
        location: {
            center: [37.617644, 55.755819],
            zoom: 9,
        },
        }"
        height="100vh"
    >

        <yandex-map-marker v-for="marker in test" :key="marker.iconSrc" :settings="{ coordinates: marker.coordinates }" position="top-center left-center">
            <img
            class="pin"
            alt=""
            :src="marker.iconSrc"
            @click="produceAnAlert"
        />
        </yandex-map-marker>
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />

        <yandex-map-clusterer
            v-model="clusterer"
            :grid-size="2 ** gridSize"
            @trueBounds="$event = trueBounds"
        >
      <yandex-map-marker v-for="marker, id in markers" :key="id"
        zoom-on-cluster-click
        :settings="{ coordinates: marker.coordinates, properties: {title: marker.title}, onClick: () => openMarker = id, zIndex: openMarker === id ? 1 : 0 }"
        :style="{
          '--color': 'color' in marker && marker.color,
          '--image': 'colors' in marker && diagramBackground(marker.colors)
        }"
      >
        <div class="pie-marker">
          <div
            v-if="openMarker === id"
            class="popup"
            @click.stop="openMarker = null"
          >
            Click me to close popup
          </div>
        </div>
      </yandex-map-marker>
      <template #cluster="{ length, clusterer }">
        <div class="cluster fade-in" @click="openCluster = clusterer.clusterId">
          {{ length }}
        </div>
        <div
          v-if="openCluster === clusterer.clusterId"
          class="popup"
          @click.stop="openCluster = null"
        >
          <span v-for="v, id in clusterer.features" :key="id" >
            {{v.properties.title}}
          </span>
        </div>
      </template>
      
    </yandex-map-clusterer>
    </yandex-map>
</template>

<script>

import {
  YandexMap,
  YandexMapClusterer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps';
import { ref, shallowRef } from 'vue'

const gridSize = ref(6)
const clusterer = shallowRef(null)
const trueBounds = ref([[0, 0], [0, 0]])

export default {
  name: 'MapComponent',
  components: {
    YandexMap,
    YandexMapClusterer,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapMarker,
  },
  data() {
    return {
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
        ],
        markers: [],
        counter: 0,
    }
  },
  metods: {
    produceAnAlert() {
        console.log('lll')
    },
    makeData() {
        for (let i = 0; i < 100; i++) {
        let latitude = Math.random() * (40 - 35) + 53;
        let longitude = Math.random() * (40 - 35) + 35;
        this.markers.push({
            coordinates: [longitude, latitude],
            title: `Title: ${latitude}, ${longitude}`,
            color: '#0E4779',
            colors: [
            {
                percentage: 30,
                color: '#0E4779',
            },
            {
                percentage: 20,
                color: '#1E98FF',
            },
            {
                percentage: 40,
                color: '#82CDFF',
            },
            {
                percentage: 10,
                color: '#ff9f82',
            },
            ],
        });
        }
    },
    diagramBackground(colors) {
        const gradient = []
        let previous = 0;
        for (let i = 0; i < colors.length; i += 1) {
            const p = colors[i];
            const deg = (360 / 100) * p.percentage;
            gradient.push(`${p.color} ${previous}deg ${previous + deg}deg`)
            previous += deg;
        }

        return `conic-gradient(${gradient.join(', ')})`;
    }
  }
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
  .marker {
    background: var(--background);
    border-radius: 100%;
    width: 20px;
    height: 20px;
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
  }
  .fade-in {
    animation: fadeIn 0.3s;
  }
  .pie-marker {
    background-color: currentColor;
    background-image: var(--image);
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .popup {
    position: absolute;
    top: calc(100% + 10px);
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    color: black;
    z-index: 999;
  }
</style>