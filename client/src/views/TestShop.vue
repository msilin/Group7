<template>
    <div>
        <ShopItem v-for="item in myItems" v-bind:key="item.id" v-bind:item="item"></ShopItem>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/components/ShopItem.vue"
import ShopItem from "@/components/ShopItem.vue";

@Component({
    components: {ShopItem}
})
export default class TestShop extends Vue {
    myItems: Item[] = [
        {id: 1,  name: "Test", price: 12.0, desc: "This is a test item!", imageUrl: "https://i.imgur.com/CfuoLpA.jpg"},
        {id: 2,  name: "Test 2", price: 15.0, desc: "This is a test item again!", imageUrl: "https://i.imgur.com/CfuoLpA.jpg"}
    ]

}
</script>
