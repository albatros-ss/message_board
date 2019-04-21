import * as fb from "firebase";

class Ad {
  constructor(
    title,
    description,
    ownerId,
    imageSrc = "",
    promo = false,
    id = null
  ) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.imageSrc = imageSrc;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    ads: [
      {
        title: "first ad",
        description: "Hello i am description",
        promo: false,
        imageSrc: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        id: "123"
      },
      {
        title: "second ad",
        description: "Hello i am description",
        promo: true,
        imageSrc: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        id: "1234"
      },
      {
        title: "third ad",
        description: "Hello i am description",
        promo: true,
        imageSrc: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        id: "12345"
      }
    ]
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    }
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      const newAd = new Ad(
        payload.title,
        payload.description,
        getters.user.id,
        payload.imageSrc,
        payload.promo
      );
      commit("clearError");
      commit("setLoading", true);
      try {
        const ad = await fb
          .database()
          .ref("ads")
          .push(newAd);
        commit("setLoading", false);
        commit("createAd", {
          ...newAd,
          id: ad.key
        });
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    }
  },
  getters: {
    ads(state) {
      return state.ads;
    },
    promoAds(state) {
      return state.ads.filter(ad => ad.promo);
    },
    myAds(state) {
      return state.ads;
    },
    getById(state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId);
      };
    }
  }
};
