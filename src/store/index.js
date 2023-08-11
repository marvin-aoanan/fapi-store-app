// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex';
import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    categories: [],
    loading: false,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setLoading(state, loading) { // Add a mutation to update loading state
      state.loading = loading;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true); // Set loading to true before fetching products
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        commit('setProducts', products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        commit('setLoading', false); // Set loading to false after fetching products
      }
    },
  },
  modules: {},
});
