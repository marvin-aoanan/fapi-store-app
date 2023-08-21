<template>
  <header class="header">
    <h1>{{ this.getAppData.siteName }}</h1>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['getAppData']),
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