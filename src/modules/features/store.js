import * as api from './api'

export default {
  state: {
    features: []
  },

  getters: {
    getFeatures: (state) => JSON.parse(JSON.stringify(state.features))
  },

  mutations: {
    FEATURES_SET (state, payload) {
      if (payload) {
        state.features = payload;
      }
    },
    FEATURE_PUSH (state, payload) {
      if (payload) {
        state.features.push(payload);
      }
    },
    FEATURE_UPDATE (state, payload) {
      if (payload) {
        state.features = state.features.map((el) => {
          return el.id === payload.id ? Object.assign(el, payload) : el
        });
      }
    },
    FEATURE_REMOVE (state, id) {
      if (id) {
        state.features = state.features.filter((el) => el.id !== id);
      }
    }
  },

  actions: {
    async fetchFeatures ({ commit }, categoryId) {
      commit('FEATURES_SET', await api.fetchFeatures(categoryId));
    },
    async storeFeature ({ commit }, payload) {
      commit('FEATURE_PUSH', await api.storeFeature(payload));
    },
    async updateFeature ({ commit }, payload) {
      commit('FEATURE_UPDATE', await api.updateFeature(payload));
    },
    async deleteFeature ({ commit }, id) {
      commit('FEATURE_REMOVE', await api.deleteFeature(id));
    }
  }
};