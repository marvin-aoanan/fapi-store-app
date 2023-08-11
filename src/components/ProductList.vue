<template>
  <div id="toolbar" class="toolbar">
    <div class="search-tool">
      <SearchBar @search="updateSearchQuery" />
    </div>
    <div class="btn-filter">
      <i class="fa fa-solid fa-filter" :class="{ 'is-active': isActive }" @click="toggleFilter"></i>
      <icon-toggle :first-icon-class="'fa fa-solid fa-table-cells-large'"
        :second-icon-class="'fa fa-regular fa-rectangle-list'" @toggle="toggleLayout" />
    </div>
    <div class="filter-tool" :class="{ 'is-active': isActive }">
      <FilterOptions v-if="products.length" :products="products" @filter="updateFilters" />
    </div>
  </div>

  <div v-if="loading" class="loader"></div>
  <div v-else id="productList" class="productList" :class="productListClasses">
    <div :id="product.id" class="product-card" v-for="product in filteredProducts" :key="product.id">
      <div class="product-image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="product-info">
        <router-link :to="{ name: 'Product', params: { id: product.id } }">
          <h2 class="product-title">{{ product.title }}</h2>
        </router-link>
        <p class="product-price">Price: {{ product.price }}</p>
        <div class="product-rating">
          <p><span v-for="star in 5" :key="star"
              :class="['fa', 'fa-star', { 'checked': star <= Math.floor(product.rating.rate) }]"></span></p>
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
      query: '',
      isActive: false,
      filters: null,
      selectedCategory: '',
      selectedRating: '',
      minPrice: 0,
      maxPrice: 10000,
    };
  },
  computed: {
    ...mapState(['products', 'loading']),
    productListClasses() {
      return this.isLayoutList ? "layout-list" : "layout-grid";
    },
    filteredProducts() {
      return this.products.filter(product =>
        (product.title.toLowerCase().includes(this.query.toLowerCase())) &&
        (this.selectedCategory === '' || product.category === this.selectedCategory) &&
        (this.selectedRating === '' || Math.floor(product.rating.rate) === this.selectedRating) &&
        (this.minPrice === null || product.price >= this.minPrice) &&
        (this.maxPrice === null || product.price <= this.maxPrice)
      );
    },
  },
  methods: {
    ...mapActions(['fetchProducts']),
    toggleLayout() {
      this.isLayoutList = !this.isLayoutList;
    },
    updateSearchQuery(query) {
      this.query = query;
    },
    toggleFilter() {
      this.isActive = !this.isActive;
    },
    // Update the filters based on filter options from FilterOptions component
    updateFilters(filters) {
      console.log('Received filters:', filters); // Debugging
      this.filters = filters;
      this.selectedCategory = filters.category;
      this.selectedRating = filters.rating;
      this.minPrice = filters.minPrice;
      this.maxPrice = filters.maxPrice;
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
/* Media Query */
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