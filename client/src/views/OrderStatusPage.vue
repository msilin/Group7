<template>
  <div class="container">
    <LogoHero></LogoHero>
    <div class="content">
      <h1 class="has-text-centered">Order Status</h1>
      <div v-if="!trackingNumber" class="columns is-mobile is-centered">
        <div class="column is-four-fifths">
          <span class="box">
            <h3>Enter Tracking Number:</h3>
            <input v-model="newTracking" class="input" type="text" placeholder="Tracking Number">
            <br>
            <br>
            <a v-on:click="submitTracking()" class="button is-primary">Find Order</a>
          </span>
        </div>
      </div>

      <OrderElement v-else v-bind:trackingNumber="trackingNumber" style="padding: 10px"></OrderElement>
    </div>
  </div>
</template>




<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LogoHero from "@/components/LogoHero.vue";
import OrderElement from "@/components/Order/OrderElement.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { Text } from "@fortawesome/fontawesome-svg-core";
import { iStatus } from "@/models/status.interface.ts";

@Component({
  components: { LogoHero, OrderElement }
})
export default class OrderStatusPage extends Vue {
  trackingNumber: number | null = null;
  newTracking: number = 0;
  state: string = "search";
  status!: iStatus | null;
  error: string | boolean = false;

  submitTracking() {
    if (isNaN(this.newTracking)) {
      this.state = "invalid";
    } else {
      this.error = false;
      alert("MAKE DB CALL");
      axios
        .get(APIConfig.buildUrl(`/status/${this.trackingNumber}`))
        .then((response: AxiosResponse<{ status: iStatus }>) => {
          this.status = response.data.status;
        })
        .catch((errorResponse: any) => {
          this.state = "invalid";
          this.error = errorResponse.response;
        });
    }

    console.log(this.error);
  }
}
</script>