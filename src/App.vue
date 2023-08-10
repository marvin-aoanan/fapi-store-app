<template>
  <router-view :appData="appData" />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appData: {
        siteName: 'fAPI Store App',
        message: 'Hello,',
        author: 'Marvin Aoanan',
      },
    };
  },
};
</script>

<style>
/* Add your global styles here */
</style>
