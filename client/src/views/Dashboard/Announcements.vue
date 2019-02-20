<template>
  <span id="announcements">
      <PostAnnouncement></PostAnnouncement>
      <AdminList></AdminList>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AdminList from "@/components/Announcement/AdminList.vue";
import PostAnnouncement from "@/components/Announcement/Post.vue";

@Component({
    components: {
        AdminList,
        PostAnnouncement
    }
})
export default class Announcements extends Vue {}
</script>
