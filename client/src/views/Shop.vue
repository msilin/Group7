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

@Component({
  components: { ShopItem, LogoHero }
})
export default class TestShop extends Vue {
  myItems: iItem[] = [];
  myCategories: iCategory[] = [];
  myDisplayedItems: iItem[] = [];
  checkedCategories: iCategory[] = [];

  mounted() {
    axios.get(APIConfig.buildUrl("/items")).then((res: AxiosResponse<iItem[]>) => {
      if (res.status == 200) {
        this.myItems = res.data;
        this.myDisplayedItems = res.data;
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
    debugger;
    this.myDisplayedItems = []
    let foundItems: iItem[] = [];
    if (this.checkedCategories.length > 0) {
      this.myItems.forEach(item => {
        this.checkedCategories.forEach(category => {
          const found = item.categories.some(icat => {
            return icat.id == category.id;
          })
          if (found) {
            foundItems.push(item);
          }
        })
      })
      this.myDisplayedItems = foundItems;
    } else {
      this.myDisplayedItems = this.myItems;
    }
  }

}

interface CategoryPicked {
  category: iCategory;
  picked: boolean;
}

</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 800px;
}
</style>
