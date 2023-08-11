<template>
  <div :id="'product-detail-' + detailedProduct.id" class="product-detail">
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

export default {
  name: 'ProductDetail',
  computed: {
    ...mapState(['products']),
    detailedProduct() {
      //console.log(this.fetchProducts());
      const productId = parseInt(this.$route.params.id, 10); // Parse to integer
      return this.products.find(product => product.id === productId);
    },
  },
  methods: {
    ...mapActions(['fetchProducts']),
    async deleteProduct() {
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/${this.detailedProduct.id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.detailedProduct),
                    }
                );
                const product = await response.json();
                console.log(product);
                window.alert(`You successfully deleted the product with id number ${this.detailedProduct.id}. See it in the console log.`);

                //this.updateProductInStore(product); // Update the product in the store

                this.$router.push('/products'); // Redirect to products list page
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },
  },
  created() {
    if (!this.products.length) {
      this.fetchProducts();
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