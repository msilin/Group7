<template>
  <div class="container">
    <LogoHero></LogoHero>
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="panel">
          <p class="panel-heading">Filters</p>
          <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth" v-on:click="updateShop">
              Apply Filters
            </button>
          </div>
          <div class="panel-block">
            <div class="level container">
              <p class="level-left">Price Range:</p>
              <div class="level-item">
                  <vue-slider 
                    ref="slider" 
                    v-model="priceRange" 
                    v-bind:min="0"
                    v-bind:max="maxPrice"
                    v-bind:sliderStyle="sliderStyle"
                    v-bind:tooltipStyle="tooltipStyle"
                    v-bind:processStyle="processStyle"
                    v-bind:value="[0, maxPrice]"
                    width="100%"
                    formatter="${value}"
                    merge-formatter="${value1} - ${value2}"
                    tooltip="hover"></vue-slider>
              </div>
            </div>
          </div>
          <label v-for="category in myCategories" v-bind:key="category.id" class="panel-block">
            <input type="checkbox" v-bind:value="category" v-model="checkedCategories">
            {{ category.name }}
          </label>
        </div>
      </div>
      <div class="column scrollable">
        <div class="columns is-multiline">
          <div v-for="item in myDisplayedItems" v-bind:key="item.id" class="column is-one-quarter">
            <div class="shop-card">
              <ShopItem v-bind:item="item"></ShopItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { iItem, iCategory } from "@/models/index.ts";
import ShopItem from "@/components/ShopItem.vue";
import LogoHero from "@/components/LogoHero.vue";
import axios,{ AxiosResponse } from 'axios';
import { APIConfig } from '@/utils/api.utils';
import vueSlider from "vue-slider-component/src/vue2-slider.vue";

@Component({
  components: { ShopItem, LogoHero, vueSlider }
})
export default class TestShop extends Vue {
  myItems: iItem[] = [];
  myCategories: iCategory[] = [];
  myDisplayedItems: iItem[] = [];
  checkedCategories: iCategory[] = [];
  priceRange = [0, 0];
  maxPrice = 0;

  tooltipStyle = [
    {
      "backgroundColor": "#3273dc",
      "borderColor": "#3273dc"
    },
    {
      "backgroundColor": "#3273dc",
      "borderColor": "#3273dc"
    }
  ]
  sliderStyle = [
    {
      "backgroundColor": "#3273dc"
    },
    {
      "backgroundColor": "#3273dc"
    }
  ]
  processStyle = {
    "backgroundColor": "#3273dc"
  }

  mounted() {
    axios.get(APIConfig.buildUrl("/items")).then((res: AxiosResponse<iItem[]>) => {
      if (res.status == 200) {
        this.myItems = res.data;
        this.myDisplayedItems = res.data;
        this.myItems.forEach(item => {
          if (item.price > this.maxPrice) {
            this.maxPrice = item.price;
          }
        });
        this.priceRange = [0, this.maxPrice]
      }
    })
    axios.get(APIConfig.buildUrl("/categories")).then((res: AxiosResponse<iCategory[]>) => {
      if (res.status == 200) {
        this.myCategories = res.data;
        debugger;
      }
    })
  }

  updateShop() {
    this.myDisplayedItems = []
    let foundItems: iItem[] = [];
    if (this.checkedCategories.length > 0) {
      this.myItems.forEach(item => {
        if (item.price >= this.priceRange[0] && item.price <= this.priceRange[1]) {
          let added = false;
          this.checkedCategories.forEach(category => {
            const found = item.categories.some(icat => {
              return icat.id == category.id;
            })
            if (found && !added) {
              foundItems.push(item);
              added = true;
            }
          })
        }
      })
      this.myDisplayedItems = foundItems;
    } else {
      this.myItems.forEach(item => {
        if (item.price >= this.priceRange[0] && item.price <= this.priceRange[1]) {
          foundItems.push(item)
        }
      })
      this.myDisplayedItems = foundItems;
    }
  }

}

</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 800px;
}
</style>
