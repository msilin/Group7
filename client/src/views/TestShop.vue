<template>
    <div class="container">
        <div class="columns is-multiline">
            <div v-for="item in myItems" v-bind:key="item.id" class="column is-one-quarter">
                <div class="shop-card">
                    <ShopItem v-bind:item="item"></ShopItem>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/components/ShopItem.vue";
import ShopItem from "@/components/ShopItem.vue";

@Component({
  components: { ShopItem }
})
export default class TestShop extends Vue {
  myItems: Item[] = [
    {
      id: 1,
      name: "Test",
      price: 12.0,
      desc: "This is a test item!",
      imageUrl: "@/assets/bike.jpeg"
    },
    {
      id: 2,
      name: "Test 2",
      price: 15.0,
      desc: "This is a test item again!",
      imageUrl: "https://i.imgur.com/CfuoLpA.jpg"
    },
    {
      id: 3,
      name: "Test 3",
      price: 12.0,
      desc: "This is a test item!",
      imageUrl: "https://i.imgur.com/CfuoLpA.jpg"
    },
    {
      id: 4,
      name: "Test 4",
      price: 15.0,
      desc: "This is a test item again!",
      imageUrl: "https://i.imgur.com/CfuoLpA.jpg"
    },
    {
      id: 5,
      name: "Test",
      price: 12.0,
      desc: "This is a test item!",
      imageUrl: "@/assets/bike.jpeg"
    },
    {
      id: 6,
      name: "Test 2",
      price: 15.0,
      desc: "This is a test item again!",
      imageUrl: "https://i.imgur.com/CfuoLpA.jpg"
    },
    {
      id: 7,
      name: "Test 3",
      price: 12.0,
      desc: "This is a test item!",
      imageUrl: "https://i.imgur.com/CfuoLpA.jpg"
    },
    {
      id: 8,
      name: "Test 4",
      price: 15.0,
      desc: "This is a test item again!",
      imageUrl: "https://i.imgur.com/CfuoLpA.jpg"
    }
  ];
}
</script>
