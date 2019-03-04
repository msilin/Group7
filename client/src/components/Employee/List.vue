<template>
  <div class="employeelist">
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Id</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Permissions</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e, index) in users" v-bind:key="index">
          <td>{{e.id}}</td>
          <td>{{e.lastName}}</td>
          <td>{{e.firstName}}</td>
          <td>{{e.userType === 2 ? "Admin" : "Employee"}}</td>
          <td>
            <button class="button is-info is-outlined is-small" v-on:click="$emit('edit', e)">
              <font-awesome-icon class="icon" icon="edit"></font-awesome-icon>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="error">
        <tr>
          <td>{{error}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { APIConfig } from "@/utils/api.utils";
import axios, { AxiosResponse } from "axios";
import { userType, iUser } from "@/models/index";

@Component
export default class EmployeeList extends Vue {
  
  @Prop({ default: [] })
  users!: iUser[];
  
  error: string | boolean = false;
}
</script>
