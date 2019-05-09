import * as fb from "firebase";

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.adId = adId;
    this.done = done;
    this.id = id;
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload;
    }
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId);
      commit("clearError");
      try {
        await fb
          .database()
          .ref(`/users/${ownerId}/orders`)
          .push(order);
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async fetchOrders({ commit, getters }) {
      commit("clearError");
      commit("setLoading", true);
      const resultOrders = [];
      try {
        await fb.auth().onAuthStateChanged(async user => {
          if (user) {
            const fbVal = await fb
              .database()
              .ref(`/users/${getters.user.id}/orders`)
              .once("value");
            const orders = fbVal.val();
            Object.keys(orders).forEach(key => {
              const o = orders[key];
              resultOrders.push(
                new Order(o.name, o.phone, o.adId, o.done, key)
              );
            });
            commit("setLoading", false);
          }
        });
        commit("loadOrders", resultOrders);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async markOrderDone({ commit, getters }, payload) {
      commit("clearError");
      try {
        await fb
          .database()
          .ref(`/users/${getters.user.id}/orders`)
          .child(payload.id)
          .update({
            done: payload.val
          });
      } catch (error) {
        commit("setError", error.message);
        throw error;
      }
    }
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(o => o.done);
    },
    undoneOrders(state) {
      return state.orders.filter(o => !o.done);
    },
    orders(state, getters) {
      return getters.doneOrders.concat(getters.undoneOrders);
    }
  }
};
