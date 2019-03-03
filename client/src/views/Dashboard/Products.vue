<template>
  <div id="products">
    <ItemEdit :editing="editing" @post="postItem" @update="updateItem" @cancel="cancelEdit"></ItemEdit>
    <ItemList :items="items" @edit="selectItem" @delete="deleteItem"></ItemList>
    <div class="has-text-danger" v-if="error">
        {{error}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import ItemList from "@/components/Item/List.vue";
import ItemEdit from "@/components/Item/Edit.vue";
import { fetchItems } from "@/views/Shop.vue";
import { iItem } from "@/models";
import { APIConfig } from "@/utils/api.utils";

@Component({
  components: {
    ItemList,
    ItemEdit
  }
})
export default class Products extends Vue {
  items: iItem[] = [];
  editing: iItem | false = false;
  error: string | false = false;

  baseUrl = "/items";

  mounted() {
    fetchItems().then((items: iItem[]) => {
      this.items = items;
    });
  }

  selectItem(item: iItem) {
    this.editing = item;
  }

  cancelEdit() {
    this.editing = false;
  }

  postItem(item: iItem) {
    this.error = false;
    axios
      .post(APIConfig.buildUrl(this.baseUrl), {
        ...item
      })
      .then((res: AxiosResponse<iItem>) => {
        this.items.push(res.data);
        this.sortItems();
        this.editing = false;
      })
      .catch(res => {
        this.error = res.response && res.response.data.error;
      });
  }

  deleteItem(item: iItem) {
    axios.delete(APIConfig.buildUrl(`${this.baseUrl}/${item.id}`)).then(res => {
      if (res.status == 200) {
        if (this.editing && this.editing.id === item.id) this.editing = false;
        this.items = this.items.filter(i => i.id !== item.id);
      } else {
        this.error = "Failed to delete service";
      }
    });
  }

  updateItem(item: iItem) {
    this.error = false;
    axios
      .put(APIConfig.buildUrl(`${this.baseUrl}/${item.id}`), { ...item })
      .then((res: AxiosResponse<iItem>) => {
        this.items = this.items.filter(i => i.id !== item.id);
        this.items.push(res.data);
        this.editing = false;
        this.sortItems();
      });
  }

  sortItems() {
    this.items = this.items.sort((a: iItem, b: iItem) => b.id - a.id);
  }
}
</script>