/**
 * Mocking client-server processing
 */
const productsDb = [
  { id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2 },
  { id: 2, title: 'H&M T-Shirt White', price: 10.99, inventory: 10 },
  { id: 3, title: 'Charli XCX - Sucker CD', price: 19.99, inventory: 5 }
];

export default {
  getProducts(cb) {
    setTimeout(() => cb(productsDb), 300)
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      /* eslint-disable no-unused-expression */
      // (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
      if (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1) {
        return cb()
      }
      return errorCb()
    }, 100)
  }
}
