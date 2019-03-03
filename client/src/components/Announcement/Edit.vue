<template>
  <div id="editannouncement" class="box">
    <form v-on:submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input required class="input" type="text" placeholder="Title" v-model="title">
        </div>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea required class="textarea" v-model="content"></textarea>
        </div>
      </div>
      <p v-if="error" class="has-text-danger has-text-centered">{{ error }}</p>
    </form>
    <div v-if="editing" class="field">
      <br>
      <button class="button is-primary is-outlined" v-on:click="$emit('update', title, content)">Update</button>
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
import { iAnnouncement } from "@/models/index";

@Component
export default class EditAnnouncement extends Vue {
  @Prop({default: false}) editing!: iAnnouncement | false;
  error: string | boolean = false;
  title: string = "";
  content: string = "";

  mounted() {
    this.refresh();
  }

  refresh() {
    if(this.editing){
      this.title = this.editing.title;
      this.content = this.editing.content;
    } else {
      this.clear();
    }
  }

  clear() {
    this.title = "";
    this.content = "";
    this.error = false;
  }

  post() {
    this.error = false;
    if (this.title !== '' && this.content !== '') {
      this.$emit('post', this.title, this.content);
    } else {
      this.error = "Please enter a title and content."
    }
  }

  @Watch('editing')
  handleEditingChange(newEditing: iAnnouncement, oldEditing: iAnnouncement) {
    this.refresh();
  }
}
</script>
