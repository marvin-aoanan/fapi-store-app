<template>
    <div class="update-product product">
        <h2>Update Product</h2>
        <form @submit.prevent="updateProduct">
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="detailedProduct.title" placeholder="Product Title" required>

            <label for="price">Price:</label>
            <input type="number" id="price" step=".01" v-model="detailedProduct.price" placeholder="Product Price" required>

            <label for="description">Description:</label>
            <textarea id="description" v-model="detailedProduct.description" placeholder="Product Description"
                required></textarea>

            <label for="category">Category:</label>
            <select id="category" v-model="detailedProduct.category" required :class="'categorySelect'">
                <option value="" disabled>Select a category</option>
                <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>

            <div class="product-image">
                <img :src="detailedProduct.image" :alt="detailedProduct.title" />
            </div>

            <label for="image">Upload or Change Product Image:</label>
            <input type="file" id="image" name="image" accept="image/*" @change="handleImageUpload">

            <div class="buttons">
                <button type="submit" class="btn">Update Product</button>
                <button @click="goToProducts" class="btn">Cancel</button>
            </div>
            
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'UpdateProduct',
    computed: {
        ...mapState(['products', 'categories']),
        detailedProduct() {
            const productId = parseInt(this.$route.params.id, 10);
            return this.products.find(product => product.id === productId) || {};
        },
    },
    methods: {
        ...mapActions(['fetchProducts', 'updateProductInStore']),
        async updateProduct() {
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/${this.detailedProduct.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.detailedProduct),
                    }
                );
                const product = await response.json();
                console.log(product);
                window.alert(`You successfully updated the product with id number ${this.detailedProduct.id}. See it in the console log.`);

                //this.updateProductInStore(product); // Update the product in the store

                //this.$router.push('/products'); // Redirect to products list page
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },
        handleImageUpload(event) {
            const selectedFile = event.target.files[0]; // Get the selected file
            if (selectedFile) {
                // Store the selected file in newProduct
                this.detailedProduct.image = selectedFile['name'];
                console.log(this.detailedProduct.image);
            }
        },
        goToProducts() {
            this.$router.push(`/product/${this.detailedProduct.id}`); // Redirect to products list page
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

</style>