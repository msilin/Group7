<template>
  <div id="home-info" class="column">
    <h1 class="title has-text-centered">Store Info</h1>
    <article class="message is-info">
        <div class="message-header">Hours</div>
        <div class="messsage-body" style="padding: 25px;">
            <p>Monday to Friday 10 AM - 6 PM</p>
            <p>Saturday 10 AM - 5 PM</p>
            <p>Sunday 12 PM - 5 PM</p>
        </div>
    </article>
    <article class="home-entry message is-info">
        <div class="message-header">Location</div>
        <div class="message-body">
            <p>767 East Foothill Blvd Ste B</p>
            <p>San Luis Obispo, CA 93405</p>
            <br>
            <figure class="media-left">
                <p class="image is-300x300">
                    <img src="@/assets/location.png" style="border-radius: 4px;">
                </p>
            </figure>
        </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";

@Component
export default class Info extends Vue {}
</script>
