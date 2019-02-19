<template>
    <div class="employeelist">
        <table class="table is-hoverable">
            <thead>
                <tr>
                    <th><abbr title="Id">EmployeeId</abbr></th>
                    <th><abbr title="LastName">Last Name</abbr></th>
                    <th><abbr title="FirstName">First Name</abbr></th>
                    <th><abbr title="Permissions">Permissions</abbr></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e, index) in users" v-bind:key="index">
                    <td>{{e.id}}</td>
                    <td>{{e.lastName}}</td>
                    <td>{{e.firstName}}</td>
                    <td>{{e.userType === 2 ? "Admin" : "Employee"}}</td>
                    <td> <button class="button is-warn is-small" v-on:click="edit(e)">
                        Edit
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
    this.$router.replace({
      name: "editEmployee",
      params: { id: `${u.id}` }
    });
  }
}

interface Users {
  users: iUser[];
}
</script>
