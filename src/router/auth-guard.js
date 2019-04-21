import store from "../store";

export default function(to, from, next) {
  console.log(11111);
  if (store.getters.user) {
    next();
  } else {
    next("/login?loginError=true");
  }
}
