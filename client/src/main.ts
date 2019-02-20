import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUpload,
  faUser,
  faCheck,
  faLock,
  faHome,
  faStore,
  faShippingFast,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faTrash,
  faEdit,
  faUpload,
  faUser,
  faCheck,
  faLock,
  faHome,
  faStore,
  faShippingFast
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
