<template>
    <div id="admindashboard">
        <div class="columns">
            <div class=column>
              <div class="box">
                <EmployeeList></EmployeeList>
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

@Component({
  components: {
    EmployeeList
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
