<template>
    <div id="announcements" class="column">
        <h1 class="title has-text-centered">Announcements</h1>
        <div class="scrollable">
          <Announcement 
            v-for="a in announcements" 
            :key="a.id"
            v-bind:announcement="a">
          </Announcement>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Announcement from "./Announcement.vue";
import { iAnnouncement } from "@/models/announcement.interface";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";

@Component({
  components: { Announcement }
})
export default class Announcements extends Vue {
  announcements: iAnnouncement[] = [];
  error: string | boolean = false;

  mounted() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/announcements"))
      .then((response: AxiosResponse<iAnnouncement[]>) => {
        this.announcements = response.data;
      })
      .catch(respose => {
        this.error = respose;
      });
  }
}

interface AnnouncementResponse {
  announcements: iAnnouncement[];
}
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 700px;
}
</style>

