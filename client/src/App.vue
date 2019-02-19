<template>
  <div id="app">
    <!-- This div contains Order Status button, Title, navbar, and signin button -->
    <div class="navbar is-info" role="navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item is-tab" to="/">Home</router-link>
          <router-link class="navbar-item is-tab" to="/testshop" exact-active-class="is-active">Shop</router-link>
          <router-link class="navbar-item is-tab" to="/status" exact-active-class="is-active">Order Status</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" v-if="!isLoggedIn" v-on:click="showSignupModal">
              <strong>Sign Up</strong>
            </a>
            <router-link
              class="button is-text"
              v-if="isLoggedIn"
              to="/my-profile"
              exact-active-class="is-active">My Profile</router-link>
            <a class="button is-light" v-if="!isLoggedIn" v-on:click="showLoginModal()">Log in</a>
            <a class="button is-light" v-if="isLoggedIn" v-on:click="logout">Log out</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="hero">
    <div class="hero-body">
      <div class="container logo">
        <figure class="image">
          <img src="./assets/logo.png">  
        </figure>
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

.logo {
  max-width: 400px;
}
</style>
