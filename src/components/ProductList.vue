<template>
  <div>
    <h1>Product List</h1>
    <img src="https://i.imgur.com/JfPpwOA.gif" v-if="loading">
    <ul v-else>
      <li :key="product.id"  v-for="product in allProducts">
        {{ product.title }} - {{ product.price }} - {{ product.inventory }}
        <button 
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'

  export default {
    name: 'product-list',

    data() {
      return {
        loading: false
      }
    },

    computed: {
      ...mapGetters({
        productIsInStock: 'productIsInStock'
      }),

      ...mapState({
        allProducts: state => state.products,
        firstProduct: state => state.products[0]
      })
    },

    // computed: {
    //   products() {
    //     return this.$store.getters.products
    //   },

    //   productIsInStock() {
    //     return this.$store.getters.productIsInStock
    //   }
    // },

    methods: {
      ...mapActions({
        addProductToCart: 'addProductToCart'
      })

      // addProductToCart(product) {
      //   this.$store.dispatch('addProductToCart', product)
      // }
    },

    created() {
      this.loading = true;
      this.$store.dispatch('fetchProducts').then(() => { this.loading = false });
    }
  }
</script>

<style scoped>
</style>
