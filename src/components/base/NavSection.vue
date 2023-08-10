<template>
    <nav class="nav">
        <ul class="main-nav">
            <li v-for="link in links" :key="link" class="nav-link">
                <router-link :to="link.url">{{ link.name }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
    data() {
        return {
            links: [
                {
                    url: '/',
                    name: 'Home'
                },
                {
                    url: '/products',
                    name: 'Products'
                },
                {
                    url: '/product/add',
                    name: 'Add Product'
                },
            ],
        }
    },
    mounted() {
        this.$emit('navHeight', this.$el.offsetHeight);
    },
};
</script>

<style scoped>
.main-nav {
    display: flex;
    background-color: rgb(221, 221, 221);
}
.nav-link {
    list-style: none;
    
   
}
.nav-link a {
    border: none;
    color: #444;
    font-weight: normal;
    text-transform: uppercase;
}
.nav-link a:hover {
    color: #888;
}
.nav-link a.router-link-exact-active {
    color: #000000;
    font-weight: bold;
}

</style>