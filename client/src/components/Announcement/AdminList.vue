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
          <tr v-for="(a, index) in announcementList" v-bind:key="index">
            <td>{{a.title}}</td>
            <td>{{formattedDate(index)}}</td>
            <td>{{a.content}}</td>
            <td>
              <button class="button is-danger is-outlined is-small" v-on:click="deleteAnnouncement(a)">
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
  announcementList: iAnnouncement[] = [];

  created() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    if (!this.$store.state.announcements) {
      this.$store
        .dispatch("fetchAnnouncements")
        .then((lst: iAnnouncement[]) => {
          this.announcementList = lst;
        });
    } else {
      this.announcementList = this.announcements;
    }
  }

  deleteAnnouncement(a: iAnnouncement) {
    this.$store.dispatch("deleteAnnouncement", { id: a.id });
  }

  get announcements(): iAnnouncement[] {
    return this.$store.state.announcements;
  }

  formattedDate(index: number): string {
    return formatDate(this.announcements[index].datePosted);
  }

  @Watch("announcements")
  handleAnnouncementsChange(
    newList: iAnnouncement[],
    oldList: iAnnouncement[]
  ) {
    this.announcementList = newList;
  }
}

interface AnnouncementResponse {
  announcements: iAnnouncement[];
}
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 400px;
}
</style>
