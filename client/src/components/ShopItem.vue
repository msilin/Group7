<template>
    <div class="shopitem" v-bind:class="{'item': item}">
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img v-bind:src="item.imageUrl">
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <h3>{{ item.name }}</h3>
                    <h6>${{ item.price }}</h6>
                    <p>{{ item.desc }}</p>
                </div>
            </div>
            <div class="card-footer">
                <a href="" class="card-footer-item">More Info</a>
                <a href="" class="card-footer-item">Add To Cart</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class ShopItem extends Vue {
  @Prop({ default: null })
  item!: Item | null;
}

export interface Item {
  id: number;
  name: string;
  desc: string;
  price: number;
  imageUrl: string;
}
</script>
