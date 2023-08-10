// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex';
import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    categories: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      commit('setProducts', products);

      // Fetch unique categories and commit them to state
      const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
      commit('setCategories', uniqueCategories);
    },
  },
  modules: {},
});
