<template>
  <div id="about-us" class="column is-one-third">
    <h1 class="title has-text-centered">About Us</h1>
    <span class="box">
        <article class="message is-info">
            <div class="messsage-body" style="padding: 25px;">
                <figure class="media-left">
                    <p class="image is-183x275">
                        <img src="@/assets/aboutUs.jpeg" style="border-radius: 4px;">
                    </p>
                </figure>
                <br>
                Located on Foothill Boulevard, we are the 
                closest bike shop to Cal Poly, a quick ride 
                from Downtown San Luis Obispo, and an easy 
                commute from Cuesta College.
            </div>
        </article>
        <article class="home-entry message is-info">
            <div class="message-body">
                No bike rack? No Problem! If you can't
                get
                your bike to us,
                we'll come to you! We offer pickup and delivery for repairs
                and new bike purchases! Contact us for details.
            </div>
        </article>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";

@Component
export default class AboutUs extends Vue {}
</script>
