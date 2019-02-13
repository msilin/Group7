<template>
    <div id="announcements" class="column box">
        <h1 class="title">Announcements</h1>
        <Announcement 
            v-for="a in announcements" 
            :key="a.id"
            v-bind:announcement="a">
        </Announcement>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Announcement from "./Announcement.vue";
import { iAnnouncement } from "@/models/announcement.interface";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: { Announcement }
})
export default class HomeAnnouncements extends Vue {
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
#announcements {
  margin-top: 3em;
}
</style>
