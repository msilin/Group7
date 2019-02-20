<template>
  <span id="employees">
      <EmployeeList></EmployeeList>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EmployeeList from "@/components/Employee/List.vue";

@Component({
    components: {
        EmployeeList
    }
})
export default class Profile extends Vue {}
</script>