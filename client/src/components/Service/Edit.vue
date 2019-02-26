<template>
  <div id="editservice" class="box">
    <form v-on:submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Title" v-model="title">
        </div>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea class="textarea" v-model="content"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Image URL</label>
        <div class="control">
          <input class="input" type="url" placeholder="URL" v-model="imageUrl">
        </div>
      </div>
      <p v-if="error" class="has-text-danger has-text-centered">{{ error }}</p>
    </form>
    <div v-if="editing" class="field">
      <br>
      <button class="button is-primary is-outlined" v-on:click="updatePost">Update</button>
      &nbsp;
      <button class="button is-outlined" v-on:click="$emit('cancel')">Cancel</button>
    </div>
    <div v-else class="field">
      <br>
      <button class="button is-primary is-outlined" v-on:click="post">Post</button>
      &nbsp;
      <button class="button is-outlined" v-on:click="clear">Clear</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { Component, Prop, Watch } from "vue-property-decorator";
import { iService } from "@/models/index";

@Component
export default class EditService extends Vue {
  @Prop({ default: false }) editing!: iService | false;
  error: string | boolean = false;
  title: string = "";
  content: string = "";
  imageUrl: string = "";

  mounted() {
    this.refresh();
  }

  refresh() {
    if (this.editing) {
      this.title = this.editing.title;
      this.content = this.editing.content;
      this.imageUrl = this.editing.imageUrl;
    } else {
      this.editing = false;
      this.clear();
    }
  }

  clear() {
    this.title = "";
    this.content = "";
    this.imageUrl = "";
    this.error = false;
  }

  post() {
    this.error = false;
    if (this.title !== "" && this.content !== "" && this.imageUrl !== "") {
      const s: iService = {
        id: 0,
        title: this.title,
        content: this.content,
        datePosted: new Date(),
        imageUrl: this.imageUrl
      };
      this.$emit("post", s);
    } else {
      this.error = "Please enter a title, content, and an image.";
    }
  }

  updatePost() {
    this.$emit("update", {
      ...this.editing,
      ...{ title: this.title, content: this.content, imageUrl: this.imageUrl }
    });
  }

  @Watch("editing")
  handleEditingChange(newEditing: iService, oldEditing: iService) {
    this.refresh();
  }
}
</script>