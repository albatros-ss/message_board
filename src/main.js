import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";
import BuyModalComponent from "@/components/Shared/BuyModal";

Vue.component("app-buy-modal", BuyModalComponent);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("fetchAds");
  },
  render: h => h(App)
}).$mount("#app");
