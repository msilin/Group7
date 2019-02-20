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

  created() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    if (!this.$store.state.announcements) {
      this.$store
        .dispatch("fetchAnnouncements")
        .then((lst: iAnnouncement[]) => {
          this.announcements = lst;
        });
    } else {
      this.announcements = this.$store.state.announcements;
    }
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 700px;
}
</style>
