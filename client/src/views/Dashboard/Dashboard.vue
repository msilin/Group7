<template>
  <div id="admindashboard">
    <br>
    <br>
    <div class="columns">
      <div class="column is-one-fifth">
        <MiniProfile v-if="user" v-bind:user="user"></MiniProfile>
        <br>
        <aside class="menu">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <li>
              <router-link to="/dashboard/products">Products</router-link>
            </li>
            <li>
              <router-link to="/dashboard/services">Services</router-link>
            </li>
          </ul>
          <span v-if="(user !== null) && userType === 2">
            <p class="menu-label">Administration</p>
            <ul class="menu-list">
              <li>
                <router-link to="/dashboard/announcements">Announcements</router-link>
              </li>
              <li>
                <router-link to="/dashboard/employees">Employees</router-link>
              </li>
            </ul>
          </span>
        </aside>
      </div>
      <div class="column">
        <div class="message">
          <div class="message-header">
            <p v-if="pageName">{{pageName}}</p>
          </div>
          <div class="message-body">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { iUser, userType } from "@/models/index";
import MiniProfile from "@/components/Employee/MiniProfile.vue";

@Component({
  components: {
    MiniProfile
  }
})
export default class Dashboard extends Vue {
  pageName: string | null = null;
  pages = [
    { path: "profile", name: "Profile" },
    { path: "products", name: "Products" },
    { path: "services", name: "Services" },
    { path: "announcements", name: "Announcements" },
    { path: "employees", name: "Employees" },
    { path: "employee/", name: "Edit Employee" }
  ];

  mounted() {
    if (!this.$store.state.user) {
      this.$router.push({ name: "home" });
      return;
    }
    this.pageName = this.getPageFromRoute(this.$route.path);
  }

  updated() {
    this.pageName = this.getPageFromRoute(this.$route.path);
  }

  getPageFromRoute(path: string): string {
    for (var p of this.pages) {
      if (path.includes(p.path)) {
        return p.name;
      }
    }
    return "";
  }

  get user() {
    return this.$store.state.user;
  }

  get userType() {
    return this.$store.state.user.userType;
  }
}
</script>
