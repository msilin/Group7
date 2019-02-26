<template>
  <div id="homelist">
    <div class="box scrollable">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Content</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(a, index) in announcements" v-bind:key="index">
            <td>{{a.title}}</td>
            <td>{{formattedDate(index)}}</td>
            <td>{{a.content}}</td>
            <td>
              <button class="button is-info is-outlined is-small" v-on:click="$emit('edit', a)">
                <font-awesome-icon class="icon" icon="edit"></font-awesome-icon>
              </button>
              &nbsp;
              <button
                class="button is-danger is-outlined is-small"
                v-on:click="$emit('delete', a)"
              >
                <font-awesome-icon class="icon" icon="trash"></font-awesome-icon>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { iAnnouncement } from "@/models/announcement.interface";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { formatDate } from "@/utils/date.utils";

@Component
export default class AdminList extends Vue {
  error: string | boolean = false;
  @Prop({default: false}) announcements!: iAnnouncement[] | false;
  
  formattedDate(index: number): string {
    if(this.announcements){
     return formatDate(this.announcements[index].datePosted);
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
