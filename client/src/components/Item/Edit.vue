<template>
  <div id="edititem" class="box">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Name</label>
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Name" v-model="thisItem.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Cost</label>
          <div class="control has-icons-left">
            <input class="input" type="number" placeholder="0.00" v-model="thisItem.price">
            <span class="has-text-small icon is-left">
              <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input class="input" type="url" placeholder="Image URL" v-model="thisItem.imageUrl">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea class="textarea" v-model="thisItem.desc"></textarea>
          </div>
        </div>
        <div v-if="editing" class="field">
          <br>
          <button
            class="button is-primary is-outlined"
            v-on:click="$emit('update', thisItem)"
          >Update</button>
          &nbsp;
          <button class="button is-outlined" v-on:click="$emit('cancel')">Cancel</button>
        </div>
        <div v-else class="field">
          <br>
          <button class="button is-primary is-outlined" v-on:click="post">Post</button>
          &nbsp;
          <button class="button is-outlined" v-on:click="clear">Clear</button>
        </div>
      </div>
      <div class="column">
        <!-- <figure v-if="imageUrl!==''" class="image" style="max-width: 20vw">
          <img :src="imageUrl">
        </figure>-->
        <div class="field">
          <label class="label">Availability</label>
          <div class="control">
            <input class="input" type="number" placeholder="Stock" v-model="thisItem.stock">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="thisItem.inStore">
              Item is in the store
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="thisItem.canShip">
              Item can be shipped
            </label>
          </div>
        </div>
        <div class="fields is-horizontal">
            <label class="label">Categories</label>
          <div class="field-body">
            <div class="field has-addons">
              <div class="control">
                <span class="select">
                  <select v-model="selectedCategory">
                    <option selected value>Category</option>
                    <option
                      v-for="(cat, index) in possibleCategories"
                      v-bind:key="index"
                      v-bind:value="cat"
                    >{{cat.name}}</option>
                  </select>
                </span>
              </div>
              <div class="control" v-on:click="addCategory">
                <a class="button is-info">Add</a>
              </div>
            </div>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="New Category" v-model="newCategory">
              </div>
              <div class="control">
                <a class="button is-outlined is-link" @click="createCategory">
                  <font-awesome-icon icon="plus"></font-awesome-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <div class="field is-grouped is-grouped-multiline">
          <div v-for="(cat, index) in thisItem.categories" v-bind:key="index" class="control">
            <div class="tags has-addons" @mouseleave="hover=-1" @mouseover="hover=index">
              <p class="tag" :class="{'is-danger': hover===index}">{{cat.name}}</p>
              <a class="tag is-delete" @click="removeCategory(cat)"></a>
            </div>
          </div>
        </div>
        <br>
        <div v-if="errors.length>0" class="has-text-danger">
          <p v-for="(err, index) in errors" :key="index">{{err}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { Component, Prop, Watch } from "vue-property-decorator";
import { iItem, iCategory, iUser } from "@/models";
import { fetchCategories } from "@/views/Shop.vue";

@Component
export default class EditItem extends Vue {
  @Prop({ default: false }) editing!: iItem | false;
  errors: string[] = [];
  thisItem: iItem = {
    id: 0,
    name: "",
    price: 0,
    desc: "",
    imageUrl: "",
    inStore: false,
    canShip: false,
    stock: 0,
    categories: []
  };

  hover = -1;
  selectedCategory: iCategory | false = false;
  possibleCategories: iCategory[] = [];
  newCategory: string = "";

  mounted() {
    this.refresh();
  }

  refresh() {
    this.clear();
    if (this.editing) {
      this.thisItem = { ...this.editing };
    } else {
      this.clear();
    }
    fetchCategories().then((categories: iCategory[]) => {
      this.possibleCategories = categories;
    });
  }

  clear() {
    this.thisItem = {
      id: 0,
      name: "",
      price: 0,
      desc: "",
      imageUrl: "",
      inStore: false,
      canShip: false,
      stock: 0,
      categories: []
    };
  }

  post() {
    this.errors = [];
    this.validateItem(this.thisItem);

    if (this.errors.length > 0) return;

    this.$emit("post", this.thisItem);
  }

  validateItem(item: iItem) {
    if (item.name === "") this.errors.push("Name required");
    if (item.price <= 0) this.errors.push("Price be greater than 0");
  }

  addCategory() {
    if (
      this.selectedCategory &&
      this.thisItem.categories.indexOf(this.selectedCategory) < 0
    ) {
      this.thisItem.categories.push(this.selectedCategory);
    }
  }

  removeCategory(category: iCategory) {
    this.thisItem.categories = this.thisItem.categories.filter(
      c => c.name !== category.name
    );
  }

  createCategory() {
      axios
      .post(APIConfig.buildUrl("/categories"), 
      {'name': this.newCategory})
      .then((res: AxiosResponse<iCategory>) => {
          this.possibleCategories.push(res.data);
          this.thisItem.categories.push(res.data);
      })
      .catch(res => {
          this.errors.push("Could not create a new category");
      })
  }

  @Watch("editing")
  handleEditChange(newEditing: iItem, oldEditing: iItem) {
    this.refresh();
  }
}
</script>

