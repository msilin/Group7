import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import TestShop from "./views/TestShop.vue";
import Dashboard from "./views/Dashboard/Dashboard.vue";
import Announcements from "./views/Dashboard/Announcements.vue";
import Employees from "./views/Dashboard/Employees.vue";
import Products from "./views/Dashboard/Products.vue";
import Profile from "./views/Dashboard/Profile.vue";
import Services from "./views/Dashboard/Services.vue";
import EditEmployeePage from "./views/Dashboard/EditEmployee.vue";


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
      path: "/testshop",
      name: "testshop",
      component: TestShop
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: [
        {
          path: "",
          name: "dashboard",
          redirect: "/dashboard/profile"
        },
        {
          path: "profile",
          component: Profile
        },
        {
          path: "products",
          component: Products
        },
        {
          path: "services",
          component: Services
        },
        {
          path: "announcements",
          component: Announcements
        },
        {
          path: "employees",
          component: Employees
        },
        {
          path: "employee/:id",
          component: EditEmployeePage
        }

      ]
    }
  ]
});
