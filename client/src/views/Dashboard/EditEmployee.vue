<template>
  <span id="editemployee">
      <EditEmployee v-if="user" v-bind:user="user"></EditEmployee>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { APIConfig } from "@/utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";
import EditEmployee from "@/components/Employee/Edit.vue";

@Component({
    components: {
        EditEmployee
    }
})
export default class EditEmployeePage extends Vue {
  user: iUser | null = null;

  mounted() {
      this.fetchUser(this.$route.params.id);
  }

  fetchUser(id: string) {
    axios
      .get(APIConfig.buildUrl(`/users/${id}`))
      .then((res: AxiosResponse<{ user: iUser }>) => {
        this.user = res.data.user;
      });
  }
}
</script>