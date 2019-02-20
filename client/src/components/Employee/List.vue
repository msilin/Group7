<template>
    <div class="employeelist">
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Id</abbr></th>
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
                    <td> <button class="button is-info is-outlined is-small" v-on:click="edit(e)">
                        <font-awesome-icon class="icon" icon="edit"></font-awesome-icon>
                        </button></td>
                </tr>
            </tbody>
            <tfoot v-if="error">
                <tr><td>{{error}}</td></tr>
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
  users: iUser[] = [];
  error: string | boolean = false;

  mounted() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/users"))
      .then((response: AxiosResponse<Users>) => {
        this.users = response.data.users;
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response;
      });
  }

  edit(u: iUser): void {
    this.$router.push(`/dashboard/employee/${u.id}`);
  }
}

interface Users {
  users: iUser[];
}
</script>
