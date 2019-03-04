<template>
  <div class="container">
    <LogoHero></LogoHero>
    <div class="content">
      <h1 class="has-text-centered">Cart</h1>
    </div>
    <div class="columns">
      <div class="box column is-three-quarters noBottomMargin">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cartItem in myCartItems" v-bind:key="cartItem.item.id">
              <td>
                  <div class="content">
                      <h4>{{ cartItem.item.name }}</h4>
                      <p>{{ cartItem.item.desc }}</p>
                      <p>${{ cartItem.item.price }}</p>
                  </div>
              </td>
              <td>
                <input
                  class="input"
                  type="text"
                  v-bind:placeholder="cartItem.quantity"
                  v-model="cartItem.quantity"
                  v-on:keyup.enter="updateQuantity(cartItem)"
                >
              </td>
              <td>
                <button class="delete" v-on:click="removeFromCart(cartItem)"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column noTopPadding">
        <div class="box">
          <div class="content">
            <h3>Summary</h3>
            <p class="noBottomMargin">Subtotal: ${{ myTotal.toFixed(2) }}</p>
            <p class="noBottomMargin">Shipping: ${{ shipping.toFixed(2) }}</p>
            <p class="noBottomMargin">Tax: ${{ tax.toFixed(2) }}</p>
            <p>Total: ${{ (myTotal + shipping + tax).toFixed(2) }}</p>
          </div>
          <button class="button primary">Submit Order</button>
        </div>
      </div>
    </div>
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
  myCartItems: iCartItem[] = [];
  myTotal = 0;
  shipping = 9.99;
  tax = 0;

  mounted() {
    this.myCartItems = this.$store.state.cartItems;
    this.calculateTotal()
  }

  makeOrder() {
      //TODO: make order
  }

  calculateTotal() {
    let currentTotal = 0;
    this.myCartItems.forEach(item => {
        currentTotal += item.item.price * item.quantity
    });
    this.myTotal = currentTotal;
    this.tax = currentTotal * 0.0725;
    console.log(currentTotal);
  }

  removeFromCart(item: iCartItem) {
    this.$store.commit("removeItem", item);
  }

  updateQuantity(item: iCartItem) {
    console.log("update quantity");
    console.log(item.quantity);
    this.$store.commit("changeItemQuantity", item);
    this.myCartItems = this.$store.state.cartItems;
    this.calculateTotal();
  }
}
</script>

<style scoped>
.noTopPadding {
    padding-bottom: 0%;
    padding-top: 0%;
}
.noBottomMargin {
    margin-bottom: 0%
}
</style>

