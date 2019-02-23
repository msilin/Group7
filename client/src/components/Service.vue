<template>
    <div class="service media box" v-bind:class="{'service': service}">
        <figure class="media-left is-128x128">
            <img v-bind:src="service.imageUrl"/>
        </figure>
        <div class="media-content">
            <div class="content">
                <h3><strong>{{ service.title }}</strong></h3>
                <p>{{ service.content }}</p>
                <p>Date Posted: {{ formattedDate }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { iService } from "@/models/service.interface";
import { formatDate } from "@/utils/date.utils"

@Component
export default class ServiceElement extends Vue {
  @Prop({ default: null })
  service!: iService | null;

  get formattedDate() {
    if (this.service) return formatDate(this.service.datePosted);
    return "";
  }

  mounted() {
    if (this.service != null) {
      if (this.service.imageUrl == "") {
        this.service.imageUrl = "https://bulma.io/images/placeholders/128x128.png";
      }
    }
  }
}
</script>