import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Ad from "@/components/Ads/Ad";
import AdList from "@/components/Ads/AdList";
import NewAd from "@/components/Ads/NewAd";
import Login from "@/components/Auth/Login";
import Registration from "@/components/Auth/Registration";
import Orders from "@/components/User/Orders";
import store from "../store";
import * as firebase from "firebase";
import firebaseConfig from "../firebaseConfig";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "",
      name: "home",
      component: Home
    },
    {
      path: "/ad/:id",
      props: true,
      name: "ad",
      component: Ad
    },
    {
      path: "/list",
      name: "list",
      component: AdList
    },
    {
      path: "/new",
      name: "newAd",
      component: NewAd
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "reg",
      component: Registration
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders
    }
  ],
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (store.getters.isFirstSession) {
    store.dispatch("setSession");
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch("autoLoginUser", user);
        next();
      } else if (
        to.name === "list" ||
        to.name === "newAd" ||
        to.name === "orders"
      ) {
        next("/login?loginError=true");
      } else {
        next();
      }
    });
  }
  next();
});

export default router;
