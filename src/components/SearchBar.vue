<template>
    <section id="search" class="search">
        <input v-model="searchQuery" @input="handleSearch" placeholder="Search products" />
        <i class="fa fa-search"></i>
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
        handleSearch() {
            this.$emit('search', this.searchQuery); // Emit the search query
            console.log('Emit search query...', this.searchQuery);
        },
    },
};
</script>

<style scoped>
.search input {
    margin: 0;
}
.search {
    padding: 5px;
    position: relative;
}
.search .fa-search {
    display: flex;
    position: absolute;
    right: 13px;
    top: 0;
    bottom: 0;
    font-size: 14px;
    align-items: center;
    color: #44444488;
}
</style>