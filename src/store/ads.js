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
    createAd({ commit }, payload) {
      payload.id = "fesfesf";
      commit("createAd", payload);
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
