<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-four-fifths">
      <span class="box">
        <article class="message is-info">
          <div class="message-header">Order Number: #{{status.order.trackingNumber}}</div>
          <div class="messsage-body" style="padding: 25px;">
            <h3>Ordered {{status.order.date}}</h3>
            <p v-if="status.type=Received">Your order is being prepared by our dedicated staff.</p>
            <p v-if="status.type=Shipping">Your order has been shippped.</p>
            <p v-if="status.type=Ready">Your order is ready for pickeudp.</p>
            <p v-if="status.type=Cancelled">Your order has been cancelled.</p>
            <br>
            <div class="columns is-mobile is-v-centered">
              <div class="column is-one-quarter">
                <figure class="media-left">
                  <p class="image is-50x50">
                    <img src="@/assets/bike.jpeg" style="border-radius: 4px;">
                  </p>
                </figure>
              </div>
              <div class="column is-three-quarters">
                <p>Super Cool Bike #345, Limited Edition Fox-Cycle Tshirt, ...</p>
                <p>$57.62</p>
              </div>
            </div>
          </div>
        </article>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { iStatus } from "@/models/status.interface";

@Component
export default class OrderElement extends Vue {
  @Prop({ default: null })
  status!: iStatus | null;
}
</script>
