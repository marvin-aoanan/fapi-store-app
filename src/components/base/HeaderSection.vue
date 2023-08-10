<template>
  <header class="header">
    <h1>{{ appData.siteName }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    appData: Object
  },
  mounted() {
    this.$emit('headerHeight', this.$el.offsetHeight);
  },
};
</script>

<style scoped>
/* Header styles */
</style>