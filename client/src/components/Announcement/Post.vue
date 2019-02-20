<template>
  <div id="postannouncement" class="box">
    <form v-on:submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Title" v-model="announcement.title">
        </div>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea class="textarea" v-model="announcement.content"></textarea>
        </div>
      </div>
      <p v-if="error" class="has-text-danger has-text-centered">{{ error }}</p>
    </form>
    <div class="field">
      <br>
      <button class="button is-primary is-outlined" v-on:click="submit">Post</button>
      &nbsp;
      <button class="button is-outlined" v-on:click="clear">Clear</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class PostAnnouncement extends Vue {
  announcement: Announcement = {
    title: "",
    content: ""
  };
  error: string | boolean = false;

  submit() {
    this.error = false;
    this.$store.dispatch("addAnnouncement", {
      title: this.announcement.title,
      content: this.announcement.content
    });
    this.clear();
  }

  clear() {
    this.announcement.title = "";
    this.announcement.content = "";
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface Announcement {
  title: string;
  content: string;
}
export interface AnnouncementResponse {
  id: number;
  datePosted: Date;
  title: string;
  content: string;
}
</script>
