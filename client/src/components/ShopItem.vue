<template>
  <div class="shopitem" v-bind:class="{'item': item}">
    <a>
    <div class="box">
        <figure class="container image is-128x128 is-centered">
            <img v-bind:src="item.imageUrl">
        </figure>
      <div class="content is-marginless">
        <p class="has-text-centered is-marginless">{{ item.name }}</p>
        <p class="has-text-centered is-marginless">${{ item.price }}</p>
      </div>
      <a class="button is-small is-fullwidth" v-on:click="addToCart(item)">Add to cart</a>
    </div>
    </a>
  </div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { iItem } from "@/models/item.interface";

@Component
export default class ShopItem extends Vue {
  @Prop({ default: null })
  item!: iItem | null;

  mounted() {
    if (this.item != null) {
      if (this.item.imageUrl == "") {
        this.item.imageUrl = "https://bulma.io/images/placeholders/128x128.png";
      }
    }
  }

  addToCart(item: iItem) {
    this.$store.commit("addItem", item)
  }
}
</script>
