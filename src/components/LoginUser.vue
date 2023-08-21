<template>
    <div v-if="!user.isLoggedIn">
        <form @submit.prevent="handleLogin">
            <input v-model="username" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button class="btn btn-login" type="submit">
                <span v-if="this.activity.isLoading" class="loader"></span>Login
            </button>
        </form>
    </div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    computed: {
        ...mapState(['user', 'activity']),
        loginUser() {
            if (!this.user.isLoggedIn) {
                return [];
            }
            return null;
        },
    },
    methods: {
        ...mapActions(['userLogin']),
        goToPage() {
            this.$router.push('/');
        },
        async handleLogin() {
            try {
                const credentials = {
                    username: this.username,
                    password: this.password,
                }
                await this.userLogin(credentials);
                // Handle the response, e.g., redirect to a new page
                await this.goToPage();
            } catch (error) {
                console.error('Handle Login Error logging in: ', error);
            }
        },
        
    },
};
</script>

<style scoped>
/* Overriding global loader */
.btn-login .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    width: 20px;
    height: 20px;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
}
</style>
  