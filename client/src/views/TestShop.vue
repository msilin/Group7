<template>
  <div class="container">
    <LogoHero></LogoHero>
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="panel">
          <p class="panel-heading">Filters</p>
          <label class="panel-block">
            <input type="checkbox">
            Category 1
          </label>
          <label class="panel-block">
            <input type="checkbox">
            Category 2
          </label>
          <label class="panel-block">
            <input type="checkbox">
            Category 3
          </label>
          <label class="panel-block">
            <input type="checkbox">
            Category 4
          </label>
        </div>
      </div>
      <div class="column scrollable">
        <div class="columns is-multiline">
          <div v-for="item in myItems" v-bind:key="item.id" class="column is-one-quarter">
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
import { iItem } from "@/models/item.interface";
import ShopItem from "@/components/ShopItem.vue";
import LogoHero from "@/components/LogoHero.vue";
import axios,{ AxiosResponse } from 'axios';
import { APIConfig } from '@/utils/api.utils';

@Component({
  components: { ShopItem, LogoHero }
})
export default class TestShop extends Vue {
  myItems: iItem[] = [];

  mounted() {
    axios.get(APIConfig.buildUrl("/items")).then((res: AxiosResponse<iItem[]>) => {
      if (res.status == 200) {
        this.myItems = res.data;
      }
    })
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 800px;
}
</style>
