import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";
import * as firebase from "firebase";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const config = {
      apiKey: "AIzaSyAh-P0chqmsUw9fjaYsz3bLp_6gwqfbFzg",
      authDomain: "itc-ads-alb.firebaseapp.com",
      databaseURL: "https://itc-ads-alb.firebaseio.com",
      projectId: "itc-ads-alb",
      storageBucket: "itc-ads-alb.appspot.com",
      messagingSenderId: "686203400465"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
