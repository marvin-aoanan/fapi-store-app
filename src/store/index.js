// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex';
import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    loading: false,
    searching: false,
    filtering: false,
    filteredProducts: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSearching(state, searching) {
      state.searching = searching;
    },
    setFiltering(state, filtering) {
      state.filtering = filtering;
    },
    setFilteredProducts(state, filteredProducts) {
      state.filteredProducts = filteredProducts;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        commit('setProducts', products);
        commit('setFilteredProducts', products); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      commit('setLoading', false);
    },
    async searchProducts({ commit, state }, query) {
      commit('setSearching', true);
      try {
        const searchResults = state.products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        commit('setFilteredProducts', searchResults);
      } catch (error) {
        console.error('Error searching products:', error);
      }
      commit('setSearching', false);
    },

    filterProducts({ commit, state }, filters) {
      commit('setFiltering', true);
      const filteredProducts = state.products.filter(product => {
        const categoryMatch = !filters || filters.category === 'All' || product.category === filters.category;
        const ratingMatch = !filters || filters.rating === '' || Math.floor(product.rating.rate) === filters.rating;
        const minPriceMatch = !filters || filters.minPrice === null || product.price >= filters.minPrice;
        const maxPriceMatch = !filters || filters.maxPrice === null || product.price <= filters.maxPrice;
          return categoryMatch && ratingMatch && minPriceMatch && maxPriceMatch;
      });
      commit('setFilteredProducts', filteredProducts);
      commit('setFiltering', false);
    },
  },
  modules: {},
});