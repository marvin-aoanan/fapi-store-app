<template>
    <footer class="footer">
        <p>Copyright 2023. Developer: {{ appData.author }}</p>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    props: { 
        appData: Object
    },
    mounted() {
        this.$emit('footerHeight', this.$el.offsetHeight);
    },
}
</script>

<style scoped>
footer {
    padding: 12px 24px;
    text-align: center;
}
</style>