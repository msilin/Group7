<template>
    <div class="container">
        <LogoHero></LogoHero>
        <div class="content">
            <h1>Cart</h1>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cartItem in myCartItems" v-bind:key="cartItem.item.id">
                    <td>{{ cartItem.item.name }}</td>
                    <td><input 
                        class="input" 
                        type="text" 
                        v-bind:placeholder="cartItem.quantity" 
                        v-on:keyup.enter="updateQuantity(cartItem)"></td>
                    <td><button class="button is-danger" v-on:click="removeFromCart(cartItem)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { iItem, iCartItem, iCategory } from "@/models/index.ts";
import LogoHero from "@/components/LogoHero.vue";

@Component({
  components: {
    LogoHero
  }
})
export default class Cart extends Vue {
    myCartItems: iCartItem[] = []

    mounted() {
        this.myCartItems = this.$store.state.cartItems
    }

    removeFromCart(item: iCartItem) {
        this.$store.commit("removeItem", item)
    }

    updateQuantity(item: iCartItem) {
        console.log("update quantity")
        this.$store.commit("changeItemQuantity", item)
    }

}
</script>
