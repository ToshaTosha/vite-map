import Vue from 'vue';
import Vuex from 'vuex';

export const store = new Vuex.Store({
  state: {
    currentCity: {
      city: "Иркутск (Иркутский район)",
      file_name: "irkutsk",
      group_id: 72,
      id: 1,
      latitude: 52.289588,
      longitude: 104.280606,
      zoom: 10
    },
    currentClients: [],
    currentEditClient: {
      id: null,
      latitude: 0,
      longitude: 0
    },
  },
  mutations: {
    updateCurrentCity(state, updatedCity) {
      state.currentCity = { ...updatedCity };
    },
    updateCurrentClients(state, updatedClients) {
      state.currentClients = { ...updatedClients };
    },
    updateCurrentEditClient(state, updatedCurrentEditClient) {
      state.currentEditClient = { ...updatedCurrentEditClient };
    }
  },
  getters: {
    getCurrentCity: state => {
      return state.currentCity;
    },
    getCurrentClients: state => {
      return state.currentClients;
    },
    getCurrentEditClient: state => {
      return state.currentEditClient;
    },
  },
});