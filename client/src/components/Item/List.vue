<template>
  <div id="itemlist">
    <div class="box scrollable">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>In Store</th>
            <th>Can Ship</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in items" v-bind:key="index">
            <td>{{i.name}}</td>
            <td>${{i.price}}</td>
            <td>
              <font-awesome-icon class="has-text-success" v-if="i.inStore" icon="check"></font-awesome-icon>
              <font-awesome-icon class="has-text-danger" v-if="!i.inStore" icon="ban"></font-awesome-icon>
            </td>
            <td>
              <font-awesome-icon class="has-text-success" v-if="i.canShip" icon="check"></font-awesome-icon>
              <font-awesome-icon class="has-text-danger" v-if="!i.canShip" icon="ban"></font-awesome-icon>
            </td>
            <td>{{i.stock}}</td>
            <td>
              <button class="button is-info is-outlined is-small" v-on:click="$emit('edit', i)">
                <font-awesome-icon class="icon" icon="edit"></font-awesome-icon>
              </button>
              &nbsp;
              <button class="button is-danger is-outlined is-small" v-on:click="$emit('delete', i)">
                <font-awesome-icon class="icon" icon="trash"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { iService } from "@/models/service.interface";
import { formatDate } from "@/utils/date.utils";
import { APIConfig } from "@/utils/api.utils";
import axios, { AxiosResponse } from "axios";
import { iItem } from "@/models";

@Component
export default class ItemList extends Vue {
  @Prop({ default: false }) items!: iItem[] | false;
}
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 400px;
}
</style>


