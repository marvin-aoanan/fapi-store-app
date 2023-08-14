<template>
  <div v-if="displayProduct">
    <div id="message" class="message">{{ message }}</div>
    <div :id="'product-detail-' + displayProduct.id" class="product-detail">
      <div v-if="loading" class="loader"></div>
      <div class="product-image">
        <img :src="displayProduct.image" :alt="displayProduct.title" />
      </div>
      <div class="product-info">
        <h2 class="product-title">{{ displayProduct.title }}</h2>
        <p class="product-description">{{ displayProduct.description }}</p>
        <p class="product-price">Price: {{ displayProduct.price }}</p>
        <div v-if="displayProduct.rating" class="product-rating">
          <p><strong>Rating: </strong>
            <span v-for="star in 5" :key="star" class="fa fa-star"
              :class="{ 'checked': star <= Math.floor(displayProduct.rating.rate) }"></span>
          </p>
          <p><em>{{ displayProduct.rating.rate }} average based on {{ displayProduct.rating.count }} reviews.</em></p>

        </div>
        <div class="buttons">
          <router-link :to="{ name: 'ProductUpdate' }" class="btn">
            <span class="icon icon-arrow-left"></span>Update Product Details
          </router-link>
          <a @click="deleteProduct" href="#" class="btn">Delete Product</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProductDetail',
  data() {
    return {
      productId: parseInt(this.$route.params.id, 10),
      message: '',
    };
  },
  methods: {
    ...mapActions(['fetchProduct', 'removeProduct']),
    async fetchSingleProduct() {
      console.log('fetchSingleProduct', this.productId);
      if (this.productId) {
        await this.fetchProduct(this.productId);
      }
    },
    async deleteProduct() {
      if (this.productId) {
        let message = this.message;
        message += "Are you sure you want to delete this product? \n";
        message += "Press OK button if sure!\n"
        message += "Press Cancel button if not sure!"
        if (confirm(message) == true) {
          await this.removeProduct(this.productId);
          window.alert(`Product id: ${this.productId}, successfully deleted.\n`);
          await this.$router.push(`/products`);
        } else {
          message = "You just canceled removing this product!";
          document.getElementById("message").innerHTML = message;
        }
      }
    },
  },
  goToProducts() {
    this.$router.push(`/products`); // Redirect to products list page
  },
  computed: {
    ...mapState(['product', 'deletedProduct']),
    displayProduct() {
      return this.product;
    },
    deletedProduct() {
      return this.deletedProduct;
    }
  },
  async created() {
    await this.fetchSingleProduct();
  },
};
</script>

<style scoped>
.product-detail {
  position: relative;
  padding: 20px 10px;
}

.product-image {
  width: 100%;
  padding: 10px;
}

@media (min-width: 768px) {
  .product-detail {
    display: flex;
  }

  .product-detail>* {
    flex: 1;
  }

  .product-image {
    max-width: 40%;
  }
}
</style>