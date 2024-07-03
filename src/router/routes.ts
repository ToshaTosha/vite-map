import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Map',
    component: () => import('@/pages/MapPage.vue'),
  },
];

export default routes
