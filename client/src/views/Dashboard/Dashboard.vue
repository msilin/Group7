<template>
  <div id="admindashboard">
    <br>
    <br>
    <div class="columns">
      <div class="column is-one-fifth">
        <MiniProfile v-bind:user="user"></MiniProfile>
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
          <span v-if="userType === 2">
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

  mounted() {
    if (!this.$store.state.user) {
      this.$router.push({ name: "home" });
      return;
    }
    console.log(this.$route);
    this.pageName = this.getPageFromRoute(this.$route.path);
  }

  updated() {
    this.pageName = this.getPageFromRoute(this.$route.path);
  }

  getPageFromRoute(path: string): string {
    const s: string[] = path.split("/");
    const page = s[s.length - 1];
    return page.charAt(0).toUpperCase() + page.slice(1);
  }

  get user() {
    return this.$store.state.user;
  }

  get userType() {
    return this.$store.state.user.userType;
  }
}
</script>
