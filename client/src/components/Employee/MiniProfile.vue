<template>
  <div id="miniprofile" class="card">
    <div v-if="profileUrl!==''" class="card-image">
      <figure class="image is-square">
        <img :src="profileUrl" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{user.firstName}} {{user.lastName}}</p>
          <p class="subtitle is-6">{{userType}}</p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a v-on:click="goToProfile" class="button is-success is-inverted card-footer-item">
        Edit
      </a>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { iUser, userType } from "@/models/index";
import { APIConfig } from "@/utils/api.utils";

@Component
export default class MiniProfile extends Vue {
  @Prop({ default: null })
  user!: iUser | null;
  userType: string = "";

  mounted() {
    this.setUserType();
  }

  setUserType() {
    if (this.user) {
      switch (this.user.userType) {
        case userType.ANON:
          this.userType = "Customer";
          break;
        case userType.EMPLOYEE:
          this.userType = "Employee";
          break;
        case userType.ADMIN:
          this.userType = "Administrator";
          break;
      }
    }
  }

  get profileUrl(): string {
    if (this.user && this.user.profileUrl && this.user.profileUrl !== "") {
      return APIConfig.buildUrl(`/${this.user.profileUrl}`);
    }
    return "";
  }
  goToProfile() {
      this.$router.push({name: "dashboard"});
  }
}
</script>


