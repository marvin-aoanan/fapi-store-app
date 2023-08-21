<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    this.initializeApp();
  },
  methods: {
    async initializeApp() {
      // Check if user and authentication token exists in localStorage
      const credentials = {
        user: localStorage.getItem('userName'),
        token: localStorage.getItem('authToken'),
      }
      if (credentials.user && credentials.token) {
        await this.$store.commit('setUserStatus', { 
          isLoggedIn: true,
          name: credentials.user, 
          accessToken: credentials.token });
      }
    },
  },

};
</script>

<style>
/* Add your global styles here */
</style>
