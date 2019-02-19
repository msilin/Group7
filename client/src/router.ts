import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MyProfile from "./views/Employee/MyProfile.vue";
import TestShop from "./views/TestShop.vue";
import Dashboard from "./views/Employee/Dashboard.vue";
import EditEmployee from "./views/Employee/Edit.vue";
import AdminDashboard from "./views/Employee/AdminDashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
    },
    {
      path: "/testshop",
      name: "testshop",
      component: TestShop
    },
    {
      path: "/employee/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: AdminDashboard
    },
    {
      path: "/employee/edit/:id",
      name: "editEmployee",
      component: EditEmployee,
      props: true
    }
  ]
});
