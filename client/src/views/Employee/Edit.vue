<template>
  <div v-if="user" id="editemployee">
    <h2 class="title is-2 has-text-centered">Employee: {{user.id}}</h2>
    <div class="container">
      <Profile v-bind:user="user"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import axios, { AxiosResponse } from "axios";
import { iUser, userType } from "@/models/index";

import { APIConfig } from "@/utils/api.utils";
import Profile from "@/components/Profile.vue";

@Component({ components: { Profile } })
export default class EditEmployee extends Vue {
  user: iUser | false = false;
  mounted() {
    if (this.$store.state.user.userType !== userType.ADMIN) {
      this.$router.push({ name: "home" });
      return;
    }
    this.getUser(this.$route.params.id);
  }

  getUser(id: string): void {
    axios
      .get(APIConfig.buildUrl(`/users/${id}`))
      .then((res: AxiosResponse<{ user: iUser }>) => {
        this.user = res.data.user;
      });
  }
}
</script>
