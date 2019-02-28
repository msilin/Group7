import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Shop from "./views/Shop.vue";
import Dashboard from "./views/Dashboard/Dashboard.vue";
import Announcements from "./views/Dashboard/Announcements.vue";
import Employees from "./views/Dashboard/Employees.vue";
import Products from "./views/Dashboard/Products.vue";
import Profile from "./views/Dashboard/Profile.vue";
import Services from "./views/Dashboard/Services.vue";
import EditEmployeePage from "./views/Dashboard/EditEmployee.vue";
import ServicesPage from "./views/ServicesPage.vue";
import Cart from "./views/Cart.vue";

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
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/services",
      name: "services",
      component: ServicesPage
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
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
          name: "announcements",
          component: Announcements
        },
        {
          path: "employees",
          name: "employees",
          component: Employees
        },
        {
          path: "employee/:id",
          component: EditEmployeePage,
          props: true
        }

      ]
    }
  ]
});
