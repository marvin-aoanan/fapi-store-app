<template>
    <section id="search" class="search">
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