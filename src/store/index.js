// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
//import { mapState, mapActions } from 'vuex';
import { createStore } from 'vuex';
import * as api from '@/api/services.js'; // Update the import path
import { createProduct } from '@/api/services';

export default createStore({
  state: {
    products: [],
    product:[],
    categories:[],
    productState: {},
    userState: {
      // preLogin: false,
      // postLogin: false,
    },
    filteredProducts: [],
    addedProduct: [],
    updatedProduct: [],
    deletedProduct: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setDeletedProduct(state, deletedProduct) {
      state.deletedProduct = deletedProduct;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setLoading(state, status) {
      state.productState = status;
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
      commit('setLoading', { isLoading: true, isComplete: false });
      try {
        const response = await api.getProducts();
        commit('setProducts', response.data);
        commit('setFilteredProducts', response.data); 
        const statusTxt = response.status == 200 || response.status == '' ? true : false;
        commit('setLoading', { isLoading: true, isComplete: statusTxt });
      } catch (error) {
        console.error('Error fetching products:', error);
        commit('setLoading', { isLoading: false, isComplete: error });
        return null; 
      }
      const categories = new Set(this.state.products.map(product => product.category));
      commit('setCategories', categories);
      commit('setLoading', { isLoading: false, isComplete: true });
    },
    async fetchProduct({ commit }, productId) {
      commit('setLoading', true);
      try {
        const response = await api.getProduct(productId);
        commit('setProduct', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      }
      commit('setLoading', false);
    },
    async removeProduct( { commit }, productId ) {
      commit('setLoading', true);
      console.log('deleteProduct, deleteting product... > ', productId);
      try {
        const response = await api.deleteProduct(productId);
        commit('setDeletedProduct', response.data);
        console.log('Deleted product: ', response.data);
      } catch (error) {
        console.error('Error deleting product:', error);
        return null;
      }
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
        return null;
      }
    },
    async searchProducts({ commit, state }, query) {
      commit('setLoading', { isSearching: true, isComplete: false,});
      try {
        const searchResults = await state.products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        commit('setFilteredProducts', searchResults);
      } catch (error) {
        console.error('Error searching products:', error);
        return null;
      }
      await commit('setLoading', { isSearching: false, isComplete: true,});
    },

    async filterProducts({ commit, state }, filters) {
      commit('setLoading', { isFiltering: true, isComplete: false,});
      const filteredProducts = await state.products.filter(product => {
        const categoryMatch = !filters || filters.category === 'All' || product.category === filters.category;
        const ratingMatch = !filters || filters.rating === '' || Math.floor(product.rating.rate) === filters.rating;
        const minPriceMatch = !filters || filters.minPrice === null || product.price >= filters.minPrice;
        const maxPriceMatch = !filters || filters.maxPrice === null || product.price <= filters.maxPrice;
          return categoryMatch && ratingMatch && minPriceMatch && maxPriceMatch;
      });
      commit('setFilteredProducts', filteredProducts);
      await commit('setLoading', { isFiltering: false, isComplete: true,});
    },
  },
  modules: {},
});