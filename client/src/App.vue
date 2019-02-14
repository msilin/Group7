<template>
  <div id="app">
    <!-- This div contains Order Status button, Title, navbar, and signin button -->
    <div
      style="display:flex; justify-content:space-evenly; align-items:
            center; padding-top: 40px;"
    >
      <button style="height: 40px; width: 80px">ORDER STATUS</button>
      <div>
        <img src="./assets/foxCycleLogo.png">
      </div>
      <button style="height: 40px; width: 80px">SIGN IN</button>
    </div>
    <div style="display: flex; justify-content: center; padding-bottom: 40px;">
      <div style="width: auto">
        <div class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-menu">
            <div class="navbar-start" style="display: flex; justify-content: center">
              <router-link
                style="padding: 20px"
                to="/"
                exact-active-class="is-active"
              >Home</router-link>
              <router-link
                style="padding: 20px"
                class="navbar-item is-tab"
                to="/testshop"
                exact-active-class="is-active"
              >Store</router-link>
              <router-link
                style="padding: 20px"
                class="navbar-item is-tab"
                to="/services"
                exact-active-class="is-active"
              >Services</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="container"/>
    <Signup
      v-bind:is-showing="showSignup"
      v-on:success="successSignup()"
      v-on:cancel="cancelSignup()"
    />
    <Login v-bind:is-showing="showLogin" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import { APIConfig } from "@/utils/api.utils";

@Component({
  components: {
    Signup,
    Login
  }
})
export default class App extends Vue {
  public showSignup: boolean = false;
  public showLogin: boolean = false;

  showSignupModal() {
    this.showSignup = true;
  }

  successSignup() {
    this.showSignup = false;
  }

  cancelSignup() {
    this.showSignup = false;
  }

  showLoginModal() {
    this.showLogin = true;
  }

  successLogin() {
    this.showLogin = false;
  }

  cancelLogin() {
    this.showLogin = false;
  }

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  logout() {
    axios
      .post(APIConfig.buildUrl("/logout"), null, {
        headers: { token: this.$store.state.userToken }
      })
      .then(() => {
        this.$store.commit("logout");
        this.$router.push({ name: "home" });
      });
  }
}
</script>


<style lang="scss">
@import "~bulma/css/bulma.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
