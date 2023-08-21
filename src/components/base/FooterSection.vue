<template>
    <footer class="footer">
        <p>Copyright 2023. Developer: {{ this.getAppData.author }}</p>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "Footer",
    computed: {
        ...mapGetters(['getAppData']),
    },
    mounted() {
        this.$emit('footerHeight', this.$el.offsetHeight);
    },
};
</script>

<style scoped>
footer {
    padding: 12px 24px;
    text-align: center;
}
</style>