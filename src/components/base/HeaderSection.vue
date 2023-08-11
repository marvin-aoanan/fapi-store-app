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
header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
}
</style>