<template>
  <div id="serviceslist">
    <div class="box scrollable">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, index) in serviceList" v-bind:key="index">
            <td>{{s.title}}</td>
            <td>{{formattedDate(index)}}</td>
            <td>{{s.content}}</td>
            <td>
              <button class="button is-info is-outlined is-small" v-on:click="$emit('edit', s)">
                <font-awesome-icon class="icon" icon="edit"></font-awesome-icon>
              </button>
              &nbsp;
              <button
                class="button is-danger is-outlined is-small"
                v-on:click="$emit('delete', s)"
              >
                <font-awesome-icon class="icon" icon="trash"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { iService } from "@/models/service.interface";
import { formatDate } from "@/utils/date.utils";
import { APIConfig } from "@/utils/api.utils";
import axios, { AxiosResponse } from "axios";

@Component
export default class ServiceList extends Vue {
  @Prop({ default: false }) serviceList!: iService[] | false;

  formattedDate(index: number): string {
    if (this.serviceList) {
      return formatDate(this.serviceList[index].datePosted);
    }
    return "";
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 400px;
}
</style>


