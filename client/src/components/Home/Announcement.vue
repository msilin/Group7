<template>
    <article class="message is-info">
        <div class="message-header">
            <p class="header is-3" style="margin-right: 10px">{{announcement.title}}</p>
        </div>
        <div class="message-body">
            {{announcement.content}}
            <br>
            <p class="subtitle is-6 is-italic has-text-right">~{{formattedDate}}</p>
        </div>
    </article>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { iAnnouncement } from "@/models/announcement.interface";
import { formatDate } from "@/utils/date.utils";

@Component
export default class Announcement extends Vue {
  @Prop({ default: null })
  announcement!: iAnnouncement | null;

  //Example of a computed value
  get formattedDate() {
    if (this.announcement) return formatDate(this.announcement.datePosted);
    return "";
  }
}
</script>
