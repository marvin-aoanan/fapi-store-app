<template>
  <div v-if="detailedProduct" :id="'product-detail-' + loadedProduct.id" class="product-detail">
    <div class="product-image">
      <img :src="detailedProduct.image" :alt="detailedProduct.title" />
    </div>
    <div class="product-info">
      <h2 class="product-title">{{ detailedProduct.title }}</h2>
      <p class="product-description">{{ detailedProduct.description }}</p>
      <p class="product-price">Price: {{ detailedProduct.price }}</p>
      <div class="product-rating">
        <p><strong>Rating: </strong>
          <span v-for="star in 5" :key="star"
            :class="['fa', 'fa-star', { 'checked': star <= Math.floor(detailedProduct.rating.rate) }]"></span>
        </p>
        <p><em>{{ detailedProduct.rating.rate }} average based on {{ detailedProduct.rating.count }} reviews.</em></p>
      </div>
      <div class="buttons">
        <router-link :to="{ name: 'ProductUpdate' }" class="btn">
          <span class="icon icon-arrow-left"></span>Update Product Details
        </router-link>
        <a @click="deleteProduct" href="#" class="btn">Delete Product</a>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getProduct, deleteProduct } from '@/api/services';

export default {
  name: 'ProductDetail',
  data() {
    return {
      loadedProduct: {},
    };
  },
  computed: {
    ...mapState(['products']),
    detailedProduct() {
      //console.log(this.fetchProducts());
      const productId = parseInt(this.$route.params.id, 10);
      return this.products.find(product => product.id === productId);
    },
  },
  methods: {
    ...mapActions(['fetchProducts']),
    handleProductDetail() {
      const productId = parseInt(this.$route.params.id, 10);
      this.detailedProduct = this.products.find(product => product.id === productId);
    },
    async fetchProductData() {
      try {
        const productId = parseInt(this.$route.params.id, 10);
        const response = await getProduct(productId);
        return response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      }
    },
    async deleteProduct() {
      try {
        const deletedProduct = await deleteProduct(this.detailedProduct.id);
        console.log(deletedProduct);
        window.alert(`You successfully deleted the product with id number ${this.detailedProduct.id}. See it in the console log.`);
        this.$router.push('/products'); // Redirect to products list page
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
  },
  async created() {
    if (!this.products.length) {
      await this.fetchProducts();
    }
    if (!this.detailedProduct) {
      const product = await this.fetchProductData();
      if (product) {
        this.$store.commit('addedProduct', product);
      }
    }
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px 10px;
}

.product-image {
  width: 100%;
  padding: 10px;
}
</style>