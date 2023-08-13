<template>
    <section id="filterOptions" class="filterOptions" @change="applyFilters">
        <div id="filterByCategory" class="filter filterSelect">
            <select v-model="selectedCategory" :class="'categorySelect'">
                <option value="" disabled>Select a category</option>
                <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
            </select>
        </div>
        <div id="filterByRating" class="filter filterByRating">
            <select id="ratingSelect" v-model.number="selectedRating">
                <option value="">All Ratings</option>
                <option v-for="rating in ratings" :key="rating" :value="rating">
                    {{ rating }} {{ rating > 1 ? 'stars' : 'star' }}
                </option>
            </select>
        </div>
        <div id="filterByPrice" class="filter filterByPrice">
            <label for="minPriceInput">Min Price: <span id="minPriceRange">{{ minPrice }}</span></label>
            <input type="range" min="0" max="10000" id="minPriceInput" v-model.number="minPrice" class="rangePriceInput">
            <label for="maxPriceInput">Max Price: <span id="maxPriceRange">{{ maxPrice }}</span></label>
            <input type="range" min="0" max="10000" id="maxPriceInput" v-model.number="maxPrice" class="rangePriceInput">
        </div>
    </section>
</template>

<script>
export default {
    props: {
        products: Array,
    },
    data() {
        return {
            query: '',
            filters: null,
            selectedCategory: 'All',
            ratings: [1, 2, 3, 4, 5],
            selectedRating: '',
            minPrice: 0,
            maxPrice: 10000,
        };
    },
    computed: {
        uniqueCategories() {
            return ['All', ...new Set(this.$store.state.products.map(product => product.category))];
        },
    },
    methods: {
        // applyFilters() {
        //     const filters = {
        //         category: this.selectedCategory,
        //         rating: this.selectedRating,
        //         minPrice: this.minPrice,
        //         maxPrice: this.maxPrice,
        //     };
        //     this.$emit('filter', filters);
        //     console.log('Emitting Filters', filters);
        // },
        applyFilters() {
            this.$emit('filter', {
                category: this.selectedCategory,
                rating: this.selectedRating,
                minPrice: this.minPrice,
                maxPrice: this.maxPrice,
            });
        },

    },
};
</script>

<style scoped>
.filterOptions {
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    padding: 5px 0;
}

.filterOptions>* {
    flex: 1 33.33%;
    margin: 5px;
    padding: 0;
}

.filterOptions input,
.filterOptions select {
    margin: 0;
}

.categorySelect {
    text-transform: capitalize;
}
</style>
