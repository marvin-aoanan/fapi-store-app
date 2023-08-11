<template>
    <div class="add-product product">
        <h2>Add New Product</h2>
        <form @submit.prevent="addProduct">
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="newProduct.title" placeholder="Product Title" required>

            <label for="price">Price:</label>
            <input type="number" id="price" step=".01" v-model="newProduct.price" placeholder="Product Price" required>

            <label for="description">Description:</label>
            <textarea id="description" v-model="newProduct.description" placeholder="Product Description"
                required></textarea>

            <label for="image">Upload Product Image:</label>
            <input type="file" id="image" name="image" accept="image/*" @change="handleImageUpload">

            <select id="category" v-model="newProduct.category" required :class="'categorySelect'">
                <option value="" disabled>Select a category</option>
                <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>

            <div class="buttons">
                <button type="submit" class="btn">Add Product</button>
                <button @click="goToProducts" class="btn">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'AddProduct',
    data() {
        return {
            newProduct: {
                title: "",
                price: 0.00,
                description: "",
                image: null, // Store the image file
                category: "",
            },
        };
    },
    computed: {
        ...mapState(['categories']), // Add categories to computed properties
    },
    methods: {
        ...mapActions(['fetchProducts']),
        async addProduct() {
            // Perform API call to create a new product
            try {
                const response = await fetch('https://fakestoreapi.com/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newProduct),
                });
                const product = await response.json();
                console.log(product);
                window.alert(`You successfully added a new product. See it in the console log.`);

                // Assuming you have a Vuex action to fetch updated products after creation
                //this.fetchProducts(); // Uncomment and replace with your actual action

                // Clear the form
                this.newProduct = {
                    title: "",
                    price: 0,
                    description: "",
                    image: "",
                    category: "",
                };
            } catch (error) {
                console.error('Error creating product:', error);
            }
        },
        handleImageUpload(event) {
            const selectedFile = event.target.files[0]; // Get the selected file
            if (selectedFile) {
                // Store the selected file in newProduct
                this.newProduct.image = selectedFile['name'];
                console.log(this.newProduct.image);
            }
        },
        goToProducts() {
            this.$router.push(`/products`); // Redirect to products list page
        },
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