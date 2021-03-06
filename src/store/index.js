import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: [], // {id, quantity}
    checkoutStatus: null,
  },

  getters: { // = computed properties
    products(state, getters) {
      return state.products;
    },

    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory >= 1);
    },

    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(prod => prod.id === cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal(state, getters) {
      return getters.cartProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    },

    productIsInStock() {
      return (product) => product.inventory > 0
    }
  },

  actions: { // = methods
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve();
        })
      })
    },

    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
      }
      commit('decrementProductInventory', product)
    },

    checkout({ state, commit }) {
      shop.buyProducts(state.cart,
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        })
    }
  },

  mutations: {
    setProducts(state, products) {
      // update products
      state.products = products;
    },

    pushProductToCart(state, productId) {
      state.cart.push({ id: productId, quantity: 1 })
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },

    emptyCart(state) {
      state.cart = []
    }
  }
});
