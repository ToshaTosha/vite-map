import { createApp } from 'vue'
import { createYmaps } from "vue-yandex-maps";
import './assets/index.css'
import App from './App.vue'
import router from './router'
import { store } from '@/store'

const app = createApp(App);

const ymaps = createYmaps({
  apikey: "9fa90fbc-ce5f-4dc9-ae6d-433e0ec7338b",
});

app.use(ymaps);
app.use(router);
app.use(store);
app.mount("#app");
