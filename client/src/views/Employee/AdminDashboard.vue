<template>
  <div id="admindashboard">
    <LogoHero></LogoHero>
    <div class="columns">
      <div class="column">
        <div class="box">
          <h2 class="subtitle has-text-centered">Employees</h2>
          <EmployeeList></EmployeeList>
        </div>
      </div>
      <div class="column is-half">
        <div class="box">
          <h2 class="subtitle has-text-centered">Announcements</h2>
          <PostAnnouncement></PostAnnouncement>
          <AdminList></AdminList>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { iUser, userType } from "@/models/index";
import EmployeeList from "@/components/Employee/List.vue";
import PostAnnouncement from "@/components/Announcement/Post.vue";
import AdminList from "@/components/Announcement/AdminList.vue";
import LogoHero from "@/components/LogoHero.vue";

@Component({
  components: {
    LogoHero,
    EmployeeList,
    PostAnnouncement,
    AdminList
  }
})
export default class AdminDashboard extends Vue {
  mounted() {
    if (
      !this.$store.state.user ||
      this.$store.state.user.userType !== userType.ADMIN
    ) {
      this.$router.push({ name: "home" });
      return;
    }
  }
}
</script>
