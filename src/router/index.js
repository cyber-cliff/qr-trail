import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Scan from "../views/Scan.vue";
import Files from "../views/Files.vue";

import {
  Field,
  Input,
  Button,
  Radio,
  Loading,
  Table,
  Notification,
  Dialog,
  Datepicker,
  Timepicker,
} from "buefy";
import "buefy/dist/buefy.css";
import VueLocalStorage from "vue-localstorage";

Vue.use(Field);
Vue.use(Input);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Loading);
Vue.use(Table);
Vue.use(Notification);
Vue.use(Dialog);
Vue.use(Datepicker);
Vue.use(Timepicker);

Vue.use(VueRouter);
Vue.use(VueLocalStorage);

const routes = [
  {
    path: "/",
    name: "Register",
    component: Register,
  },
  {
    path: "/scan",
    name: "Scan",
    component: Scan,
  },
  {
    path: "/files",
    name: "Files",
    component: Files,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
