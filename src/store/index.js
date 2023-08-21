// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import { createStore } from 'vuex';
import * as api from '@/api/services'; // Update the import path
export default createStore({
  state: {
    appData: {
      siteName: 'fAPI Store App',
      author: 'Marvin Aoanan',
      version: '1.23.0',
      message: {
        welcome: '',
      },
    },
    user: {
      isPreReg: false,
      isPreLogin: false,
      isLoggedIn: false,
      isLogOut: false,
      name: 'visitor',
      accessToken: null,
    },
    activity: {
      isLoading: false,
    },
    //productState: [],
    products: [],
    categories: [],
    product: [],
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
    setUpdatedProduct(state, updatedProduct) {
      state.updatedProduct = updatedProduct;
    },
    setDeletedProduct(state, deletedProduct) {
      state.deletedProduct = deletedProduct;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setLoading(state, status) {
      state.activity = status;
    },
    setFilteredProducts(state, filteredProducts) {
      state.filteredProducts = filteredProducts;
    },
    setNewProduct(state, addedProduct) {
      state.addedProduct = addedProduct;
    },
    setUserStatus(state, status) {
      state.user = status;
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    // Get Products
    async fetchProducts({ commit }) {
      commit('setLoading', { isLoading: true, isUpdated: false, isComplete: false });
      try {
        const response = await api.getProducts();
        commit('setProducts', response.data);
        commit('setFilteredProducts', response.data);
        const statusTxt = response.status == 200 || response.status == '' ? true : false;
        commit('setLoading', { isLoading: true, isUpdated: false, isComplete: statusTxt });
      } catch (error) {
        console.error('Error fetching products:', error);
        commit('setLoading', { isLoading: false, isUpdated: false, isComplete: error });
        return null;
      }
      //const categories = new Set(this.state.products.map(product => product.category));
      //commit('setCategories', categories);
      commit('setLoading', { isLoading: false, isUpdated: false, isComplete: true });
    },
    async fetchCategories({ commit }) {
      try {
        const response = await api.getCategories();
        console.log(response);
        commit('setCategories', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchProduct({ commit }, productId) {
      commit('setLoading', { isLoading: true, isUpdated: false, isComplete: false });
      try {
        const response = await api.getProduct(productId);
        commit('setProduct', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        commit('setLoading', { isLoading: false, isComplete: error });
      }
      commit('setLoading', { isLoading: false, isUpdated: false, isComplete: true });
    },

    // Get Carts
    async fetchCarts() {
      try {
        const response = await api.getCarts();
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    },

    // Setters and Filters
    async editProduct({ commit, state }, displayProduct) {
      commit('setLoading', { isLoading: true, isUpdated: false, isComplete: false });
      try {
        const response = await api.updateProduct(displayProduct.id, displayProduct);
        commit('setProduct', response.data);
        commit('setUpdatedProduct', response.data);
        console.log('Product successfully updated:', response.data);
      } catch (error) {
        commit('setLoading', { isLoading: false, isUpdated: false, isComplete: error });
        console.error('Error updating product:', error);
      }
      commit('setLoading', { isLoading: false, isUpdated: true, isComplete: true });
      const updatedProducts = Object.values(state.products);
      const index = updatedProducts.findIndex((el) => el.id === state.updatedProduct.id);
      updatedProducts[index] = state.updatedProduct;
      commit('setProducts', updatedProducts);
      commit('setFilteredProducts', updatedProducts);
    },
    async removeProduct({ commit, state }, productId) {
      commit('setLoading', { isLoading: true, isDeleted: false, isComplete: false });
      try {
        const response = await api.deleteProduct(productId);
        commit('setDeletedProduct', response.data);
        console.log('Deleted product: ', response.data);
      } catch (error) {
        commit('setLoading', { isLoading: true, isDeleted: false, isComplete: error });
        console.error('Error deleting product:', error);
      }
      commit('setLoading', { isLoading: false, isDeleted: true, isComplete: true });

      const updatedProducts = Object.values(state.products);
      console.log('Products: ', updatedProducts);
      const index = updatedProducts.findIndex((el) => el.id === productId);
      //const index = updatedProducts.indexOf(productId);
      console.log('ID: ', productId);
      console.log('Index: ', index);
      if (index > -1) { // only splice array when item is found
        updatedProducts.splice(index, 1); // 2nd parameter means remove one item only
      }
      console.log('Deleted: ', updatedProducts);
      commit('setProducts', updatedProducts);
      commit('setFilteredProducts', updatedProducts);
    },
    async addProduct({ commit, state, dispatch }, newProduct) {
      commit('setLoading', { isLoading: true, isAdded: false, isComplete: false });
      try {
        const response = await api.createProduct(newProduct);
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
      commit('setLoading', { isLoading: false, isAdded: true, isComplete: true });
      const addedProduct = state.addedProduct;
      console.log(addedProduct);
      state.products.unshift(addedProduct);
    },
    async searchProducts({ commit, state }, query) {
      commit('setLoading', { isSearching: true, isComplete: false, });
      try {
        const searchResults = await state.products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        commit('setFilteredProducts', searchResults);
      } catch (error) {
        console.error('Error searching products:', error);
        return null;
      }
      await commit('setLoading', { isSearching: false, isComplete: true, });
    },
    async filterProducts({ commit, state }, filters) {
      commit('setLoading', { isFiltering: true, isComplete: false, });
      const filteredProducts = await state.products.filter(product => {
        const categoryMatch = !filters || filters.category === 'All' || product.category === filters.category;
        const ratingMatch = !filters || filters.rating === '' || Math.floor(product.rating.rate) === filters.rating;
        const minPriceMatch = !filters || filters.minPrice === null || product.price >= filters.minPrice;
        const maxPriceMatch = !filters || filters.maxPrice === null || product.price <= filters.maxPrice;
        return categoryMatch && ratingMatch && minPriceMatch && maxPriceMatch;
      });
      commit('setFilteredProducts', filteredProducts);
      await commit('setLoading', { isFiltering: false, isComplete: true, });
    },

    // User Login
    async userLogin({ commit }, credentials) {
      commit('setUserStatus', { isLoggedIn: false, accessToken: null });
      commit('setLoading', { isLoading: true });
      try {
        // Perform login using the login service
        const response = await api.login(credentials);
        const token = response.data.token;
        commit('setUserStatus', { isLoggedIn: true, name: credentials.username, accessToken: token, });
        
        // Set userName & authToken to localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', credentials.username);

        commit('setLoading', { isLoading: false });
        commit('setMessage', { success: true });
      } catch (error) {
        console.error('Error logging in:', error);
        commit('setMessage', { error: error.response.data });
      }
    },
    setUserFromToken({ commit }, credentials) {
      // Perform the necessary decoding of the token to extract user data
      //const userData = decodeToken(token);
      console.log('setUserFromToken', credentials);
      
      // Commit a mutation to set the user state
      commit('setUserStatus', {
        isLoggedIn: true,
        name: credentials.user,
        accessToken: credentials.token,
      });
    },
    
  },
  getters: {
    getAppData: (state) => state.appData,
    isLoggedIn: (state) => state.user.isLoggedIn,
    getUserName: (state) => state.user.name,
  },
  modules: {},
});