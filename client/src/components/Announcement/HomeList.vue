<template>
    <div id="homelist" class="column is-one-third">
        <h1 class="title has-text-centered">Announcements</h1>
        <div class="box scrollable">
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
import Announcement from "@/components/Announcement/Message.vue";
import { iAnnouncement } from "@/models/announcement.interface";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";

@Component({
  components: { Announcement }
})
export default class HomeList extends Vue {
  announcements: iAnnouncement[] = [];
  error: string | boolean = false;

  mounted() {
    this.fetchAnnouncements();
  }

  fetchAnnouncements() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/announcements"))
      .then((res: AxiosResponse<iAnnouncement[]>) => {
        this.announcements = res.data;
        this.sortAnnouncements();
      })
      .catch(res => {
        this.error = res.data;
      });
  }

  sortAnnouncements() {
    this.announcements = this.announcements.sort(this.decreasingOrder);
  }

  decreasingOrder(a: iAnnouncement, b: iAnnouncement) {
    return b.id - a.id;
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 700px;
}
</style>
