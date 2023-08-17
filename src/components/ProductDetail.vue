<template>
  <div v-if="displayProduct || productState.isComplete">
    <div id="message" class="message">{{ message }}</div>
    <div :id="'product-detail-' + displayProduct.id" class="product-detail">
      <div v-if="productState.isLoading" class="loader"></div>
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
      fetchedProducts: this.$store.state.products,
      updatedProduct: this.$store.state.updatedProduct,
      message: '',
    };
  },
  methods: {
    ...mapActions(['fetchProduct', 'removeProduct']),
    goToProducts() {
      this.$router.push(`/products`); // Redirect to products list page
    },
    async fetchSingleProduct() {
      const hasFetchedProducts = Object.keys(this.fetchedProducts).length;
      const dataProducts = Object.values(this.fetchedProducts);
      const dataProduct = dataProducts.find((product) => product.id == this.productId);
      if (hasFetchedProducts == 0) { // Do fetch only if there is no products in Store
        await this.fetchProduct(this.productId);
      } else {
        this.$store.commit('setProduct', dataProduct);
        return this.fetchedProducts;
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
          this.goToProducts();
        } else {
          message = "You just canceled removing this product!";
          document.getElementById("message").innerHTML = message;
        }
      }
    },
  },
  computed: {
    ...mapState(['product', 'deletedProduct', 'productState']),
    displayProduct() {
      const hasFetchedProduct = Object.keys(this.updatedProduct).length;
      if ( (hasFetchedProduct > 0) && this.productId == this.updatedProduct.id ) {
        return this.updatedProduct;
      } else {
        return this.product;
      }
    },
    deletedProduct() {
      return this.deletedProduct;
    }
  },
  created() {
    //const updatedProduct = this.$store.state.updatedProduct;
    //const isProduct = Object.keys(this.fetchedProduct).length;
    //if (isProduct == 0) {
      this.fetchSingleProduct();
    //}
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