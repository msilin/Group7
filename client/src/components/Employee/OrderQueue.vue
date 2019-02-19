<template>
    <table class="table">
        <thead>
            <tr>
                <th><abbr title="OrderNumber">Order #</abbr></th>
                <th><abbr title="Updated">Last Update</abbr></th>
                <th><abbr title="Status">Status</abbr></th>
                <th><abbr title="Claim"></abbr></th>
                <th v-if="uType === userType.ADMIN"><abbr title="Delete"></abbr></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders">

            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import axios, { AxiosResponse } from "axios";
import { userType, iOrder, iUser } from "@/models/index";

export default class OrderQueue extends Vue {
  @Prop() orders!: iOrder;

  get user(): iUser {
    return this.$store.state.user;
  }
  get uType() {
    return this.user.userType;
  }
}
</script>
