<template>
  <SearchBar @search="updateSearchQuery" />
  <FilterOptions v-if="products.length" :products="products" @filter="updateFilters" />
  <div id="productList">
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

export default {
  components: {
    SearchBar,
    FilterOptions,
  },
  computed: {
    ...mapState(['products']),
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
  data() {
    return {
      query: '',
      filters: null,
      selectedCategory: '',
      selectedRating: '',
      minPrice: 0,
      maxPrice: 10000,
    };
  },
  methods: {
    ...mapActions(['fetchProducts']),
    updateSearchQuery(query) {
      this.query = query;
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

<style scoped></style>