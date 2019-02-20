<template>
  <span id="profile">
      <EditEmployee v-bind:user="user"></EditEmployee>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EditEmployee from "@/components/Employee/Edit.vue";

@Component({
    components: {
        EditEmployee
    }
})
export default class Profile extends Vue {
  get user() {
    return this.$store.state.user;
  }
}
</script>
