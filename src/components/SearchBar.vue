<template>
    <section id="search" class="search">
        <span class="search-icon"><i class="fa fa-regular fa-magnifying-glass"></i></span>
        <input v-model="searchQuery" @input="searchProducts" placeholder="Search products" />
    </section>
</template>
  
<script>
export default {
    data() {
        return {
            searchQuery: '',
        };
    },
    methods: {
        searchProducts() {
            console.log("Searching...");
            this.$emit('search', this.searchQuery);
        },
    },
};
</script>