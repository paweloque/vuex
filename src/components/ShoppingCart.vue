<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li :key="product.id" v-for="product in products">{{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}</li>
    </ul>
    <p>total: {{ total | currency }}</p>
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'shopping-cart',

    computed: {
      ...mapGetters({
        products: 'cartProducts',
        total: 'cartTotal'
      }),

      ...mapState({
        checkoutStatus: 'checkoutStatus'
      })
    },

    methods: {
      ...mapActions(['checkout'])
    }
  }
</script>

<style scoped>
</style>
