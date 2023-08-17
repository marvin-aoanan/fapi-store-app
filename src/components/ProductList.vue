<template>
  <div id="toolbar" class="toolbar">
    <div class="search-tool">
      <SearchBar @search="updateSearch" />
    </div>
    <div class="btn-filter">
      <i class="fa fa-solid fa-filter" :class="{ 'is-active': isActive }" @click="toggleFilter"></i>
      <icon-toggle :first-icon-class="'fa fa-solid fa-table-cells-large'"
        :second-icon-class="'fa fa-regular fa-rectangle-list'" @toggle="toggleLayout" />
    </div>
    <div class="filter-tool" :class="{ 'is-active': isActive }">
      <FilterOptions v-if="products.length" :products="filteredProducts" @filter="updateFilters" />
    </div>
  </div>

  <div v-if="productState.isLoading || productState.isSearching || productState.isFiltering" class="loader"></div>
  <div v-if="productState.isComplete" id="productList" class="productList" :class="productListLayout">
    <div :id="product.id" class="product-card" v-for="product in displayedProducts" :key="product.id">
      <div class="product-image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="product-info">
        <router-link :to="{ name: 'Product', params: { id: product.id } }">
          <h2 class="product-title">{{ product.title }}</h2>
        </router-link>
        <p class="product-price">Price: {{ product.price }}</p>
        <div v-if="product.rating" class="product-rating">
          <p><span v-for="star in 5" :key="star" class="fa fa-star"
              :class=" {'checked': star <= Math.floor(product.rating.rate) }"></span></p>
          <p><em>{{ product.rating.rate }} average based on {{ product.rating.count }} reviews.</em></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import IconToggle from '@/components/helpers/IconToggle.vue';

export default {
  components: {
    SearchBar,
    FilterOptions,
    IconToggle,
  },
  data() {
    return {
      isLayoutList: false,
      isActive: false,
      query: '',
      filters: null,
      fetchedProducts: this.$store.state.products,
      updatedProduct: this.$store.state.updatedProduct,
    };
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories', 'searchProducts', 'filterProducts']),
    toggleLayout() {
      this.isLayoutList = !this.isLayoutList;
    },
    toggleFilter() {
      this.isActive = !this.isActive;
    },
    updateFilters(filters) {
      this.filters = filters;
      if (this.filters) {
        console.log('updateFilters this.filters', this.filters);
        this.filterProducts(this.filters, this.query);
      }
    },
    updateSearch(query) {
      this.query = query;
      if (this.query) {
        this.searchProducts(query);
      } else {
        this.$store.commit('setFilteredProducts', this.$store.state.products);
      }
      // Also set products to update the view
      this.products = this.$store.state.filteredProducts;
    },

  },
  computed: {
    ...mapState(['products', 'filteredProducts', 'productState']),
    productListLayout() {
      return this.isLayoutList ? "layout-list" : "layout-grid";
    },
    displayedProducts() {
      if (this.productState.isLoading || this.productState.isSearching || this.productState.isFiltering) {
        return [];
      }
      if(this.productState.isComplete) {
        return this.filteredProducts;
      }
      if (this.query || this.productState.isSearching) {
        return this.filteredProducts;
      }
      if (this.filters || this.productState.isFiltering) {
        return this.filteredProducts;
      }
      return this.products;
    },

  },
  async created() {
    const hasFetchedProducts = Object.keys(this.fetchedProducts).length;
    if(hasFetchedProducts == 0) {
      await this.fetchProducts();
      await this.fetchCategories();
    }
    
  },
};
</script>

<style scoped>
@media (min-width: 0px) and (max-width: 440px) {}

@media (min-width: 768px) {
  .layout-grid>* {
    flex: 1 25%;
  }
}

@media (min-width: 1024px) {
  .layout-grid>* {
    flex: 1 20%;
  }
}

@media (min-width: 1440px) {
  .layout-grid>* {
    flex: 1 15%;
  }
}
</style>