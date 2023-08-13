// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import * as api from '@/api/services.js'; // Update the import path

//import { mapState, mapActions } from 'vuex';
import { createStore } from 'vuex';
import { createProduct } from '@/api/services';

export default createStore({
  state: {
    products: [],
    categories:[],
    loading: false,
    searching: false,
    filtering: false,
    filteredProducts: [],
    addedProduct: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
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
    setNewProduct(state, addedProduct) {
      state.addedProduct = addedProduct;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      try {
        const response = await api.getProducts();
        commit('setProducts', response.data);
        commit('setFilteredProducts', response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      const categories = new Set(this.state.products.map(product => product.category));
      commit('setCategories', categories);
      commit('setLoading', false);
    },
    async addProduct({ commit, dispatch }, newProduct) {
      try {
        const response = await createProduct(newProduct);
        if (response.data) {
          commit('setNewProduct', response.data)
          console.log('Product added:', response.data);
          window.alert('You successfully added a new product.');
          
          // Call the fetchProducts action to update the list of products
          await dispatch('fetchProducts');
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
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