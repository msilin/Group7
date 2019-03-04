<template>
  <span id="employees">
    <EditEmployee
      v-bind:user="editing"
      v-bind:viewerPriveleges="currentPriv"
      v-on:cancel="cancelEdit"
      v-on:update="patchUser"
      v-on:post="postUser"
    ></EditEmployee>
    <EmployeeList v-bind:users="employees" v-on:edit="selectEmployee"></EmployeeList>
    <p>{{ error }}</p>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EmployeeList from "@/components/Employee/List.vue";
import EditEmployee from "@/components/Employee/Edit.vue";
import { APIConfig } from "@/utils/api.utils";
import axios, { AxiosResponse } from "axios";
import { userType, iUser } from "@/models/index";

@Component({
  components: {
    EmployeeList,
    EditEmployee
  }
})
export default class Profile extends Vue {
  editing: iUser | false = false;
  employees: iUser[] = [];
  error: string | false = false;
  currentPriv: userType = userType.ANON

  mounted() {
    this.fetchUsers();
    this.setPrivilege()
  }

  selectEmployee(user: iUser) {
    this.editing = user;
  }

  cancelEdit() {
    this.editing = false;
  }

  fetchUsers() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/users"))
      .then((response: AxiosResponse<Users>) => {
        this.employees = response.data.users;
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response;
      });
  }

  patchUser() {
    this.error = false;
    if (this.editing) {
      const url = `${APIConfig.url}/users/${this.editing.id}`;
      axios
        .patch(url, {
          user: this.editing
        })
        .then((response: AxiosResponse<iUser>) => {
          this.employees = this.employees.filter(
            u => u.id !== response.data.id
          );
          console.log(response.data)
          this.employees.push(response.data);
          this.sortEmployees();
          this.editing = false;
        })
        .catch((errorResponse: any) => {
          this.error = errorResponse.response.data.reason;
        });
    }
  }

  postUser(newUser: iUser) {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/users"), {
        ...newUser
      })
      .then((response: AxiosResponse<iUser>) => {
        this.employees.push(response.data)
        this.sortEmployees()
        this.editing = false
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response.data.reason;
      });
  }

  setPrivilege() {
      if (this.$store.state.user != null) {
        this.currentPriv = this.$store.state.user.userType;
      } else {
        this.currentPriv = userType.ANON
      }
  }

  sortEmployees() {
    this.employees.sort((a: iUser, b: iUser) => a.id - b.id);
  }
}

interface Users {
  users: iUser[];
}
</script>