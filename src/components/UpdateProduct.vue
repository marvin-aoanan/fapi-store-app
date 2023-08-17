<template>
    <div class="update-product product" v-if="displayProduct">
        <div v-if="productState.isLoading" class="loader"></div>
        <h2>Update Product</h2>
        <form @submit.prevent="submitProductUpdate">
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="displayProduct.title" placeholder="Product Title" required />

            <label for="price">Price:</label>
            <input type="number" id="price" step=".01" v-model="displayProduct.price" placeholder="Product Price"
                required />

            <label for="description">Description:</label>
            <textarea id="description" v-model="displayProduct.description" placeholder="Product Description"
                required></textarea>

            <label for="category">Category:</label>
            <select id="category" v-model="displayProduct.category" required :class="'categorySelect'">
                <option value="" disabled>Select a category</option>
                <option v-for="category in categories" :key="category">
                    {{ category }}
                </option>
            </select>

            <div class="product-image">
                <img :src="displayProduct.image" :alt="displayProduct.title" />
            </div>

            <label for="image">Upload or Change Product Image:</label>
            <input type="file" id="image" name="image" accept="image/*" @change="handleImageUpload" />

            <div class="buttons">
                <button type="submit" class="btn">Update Product</button>
                <button @click="goToProducts" class="btn">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "UpdateProduct",
    data() {
        return {
            productId: parseInt(this.$route.params.id, 10),
            updatedProduct: this.$store.state.updatedProduct,
        };
    },
    methods: {
        ...mapActions(["fetchProducts", "fetchCategories", "fetchProduct",  "editProduct"]),
        goToProducts() {
            this.$router.push(`/product/${this.productId}`);
        },
        handleImageUpload(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.displayProduct.image = selectedFile.name;
            }
        },
        async fetchSingleProduct() {
            if (this.productId) {
                try {
                    await this.fetchProduct(this.productId);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        },
        async submitProductUpdate() {
            if (this.productId) {
                try {
                    const response = await this.editProduct(this.displayProduct);
                    console.log('submitProductUpdate: ', response);
                } catch (error) {
                    console.error('Error submitting product update:', error);
                }
            }
            this.goToProducts();
        },
    },
    computed: {
        ...mapState(["products", "categories", "product", "productState", "updatedProduct"]),
        displayProduct() {
            if(Object.keys(this.updatedProduct).length && this.productId === this.updatedProduct.id) {
                return this.updatedProduct;
            } else {
                return this.product;
            }
        },
    },
    async created() {
        //const updatedProduct = this.$store.state.updatedProduct;
        const hasUpdatedProduct = Object.keys(this.updatedProduct).length;
        if(hasUpdatedProduct == 0 && (this.updatedProduct.id != this.productId)) {
            await this.fetchSingleProduct();
            await this.fetchProducts();
            await this.fetchCategories();
        }
    },
};
</script>

<style scoped>
@media (min-width: 768px) {
    .buttons {
        display: flex;
        margin: 10px 0 0 -10px;
        width: calc(100% + 10px);
    }

    .buttons .btn {
        flex: 1;
        margin: 10px 0 0 10px;
    }

    .buttons button.btn {
        margin: 10px 0 0 10px;
    }
}
</style>
