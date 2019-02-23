<template>
  <div id="app">
    <!-- This div contains Order Status button, Title, navbar, and signin button -->
    <div class="navbar is-white has-shadow" role="navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item is-tab" to="/">
            <font-awesome-icon class="has-text-link" icon="home"/>&nbsp;Home
          </router-link>
          <router-link class="navbar-item is-tab" to="/shop" exact-active-class="is-active">
            <font-awesome-icon class="has-text-info" icon="store"/>&nbsp;Shop
          </router-link>
          <router-link class="navbar-item is-tab" to="/services" exact-active-class="is-active">
            <font-awesome-icon class="has-text-primary" icon="wrench"/>&nbsp;Services
          </router-link>
          <router-link
            class="navbar-item is-tab"
            to="/status"
            exact-active-class="is-active"
          ><font-awesome-icon class="has-text-success" icon="shipping-fast"/>&nbsp;Order Status</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link
                class="button is-link is-outlined"
                v-if="isLoggedIn"
                to="/dashboard"
                exact-active-class="is-active"
              >Dashboard</router-link>
              <a class="button is-info is-outlined" v-if="!isLoggedIn" v-on:click="showLoginModal()">Log in</a>
              <a class="button is-danger is-outlined" v-if="isLoggedIn" v-on:click="logout">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view class="container"/>
    <Login v-bind:is-showing="showLogin" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
    <footer class="footer">
      <p class="content has-text-centered">Group VII baby</p>
    </footer>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import { APIConfig } from "@/utils/api.utils";
import { userType } from "@/models";

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

  get userType(): userType {
    let t: userType = this.$store.state.user
      ? this.$store.state.user.userType
      : undefined;
    return t ? t : userType.ANON;
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

.scrollable {
  overflow-y: scroll;
  height: 400px;
}

.logo {
  max-width: 400px;
}
</style>
