import * as fb from "firebase";

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null,
    firstSession: true
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setSession(state, payload) {
      state.firstSession = payload;
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .signInWithEmailAndPassword(email, password);
        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    autoLoginUser({ commit }, payload) {
      commit("setUser", new User(payload.uid));
    },
    logoutUser({ commit }) {
      fb.auth().signOut();
      commit("setUser", null);
    },
    setSession({ commit }) {
      commit("setSession", false);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    },
    isFirstSession(state) {
      return state.firstSession;
    }
  }
};
