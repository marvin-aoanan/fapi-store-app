<template>
    <nav class="nav">
        <ul class="main-nav">
            <li v-for="link in links" :key="link" class="nav-link main-link">
                <router-link :to="link.url">{{ link.name }}</router-link>
            </li>
        </ul>
        <ul class="user-nav">
            <!-- Show Login/Logout link based on isLoggedIn state -->
            <li v-for="link in userLinks" :key="link.name" class="nav-link user-link" :class="link.class">
                <router-link :to="link.url" @click="handleLinkClick(link)">
                    {{ link.name }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
            ]
        }
    },
    methods: {
        ...mapActions(['onLogin', 'onLogout']),
        onLogin() {
            this.$router.push('/login');
        },
        async onLogout() {
            await this.$store.commit('setUserStatus', { isLoggedIn: false, accessToken: null, name: null });
            await localStorage.removeItem('userName');
            await localStorage.removeItem('authToken');

            // Redirect user to /logout
            await this.$router.push('/logout');
        },
        handleLinkClick(link) {
            if (link.name === 'Login') {
                this.onLogin();
            } else if (link.name === 'Logout') {
                this.onLogout();
            }
        },

    },
    computed: {
        ...mapState(['user']),
        userLinks() {
            return [
                {
                    name: this.user.isLoggedIn ? 'Logout' : 'Login', // Set the link name dynamically
                    url: this.user.isLoggedIn ? '/logout' : '/login', // Set the link URL dynamically
                    class: this.user.isLoggedIn ? 'user-logout' : 'user-login',
                    click: this.user.isLoggedIn ? 'onLogout' : 'onLogin',
                },
                // ... Other user links ...
            ];
        },
    },
    mounted() {
        this.$emit('navHeight', this.$el.offsetHeight);
    },
};
</script>

<style scoped>
.nav {
    background-color: rgb(221, 221, 221);
    display: flex;
    justify-content: space-between;
}

.main-nav,
.user-nav {
    display: flex;
}

.nav-link {
    list-style: none;
}

.nav-link a {
    display: inline-block;
    padding: 16px;
    border: none;
    color: #444;
    font-weight: normal;
    text-decoration: none;
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