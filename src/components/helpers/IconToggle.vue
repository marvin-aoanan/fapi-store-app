<template>
    <span class="btn-layout-toggle" @click="toggleIcon">
        <i :class="currentIconClass"></i>
    </span>
</template>
  
<script>
export default {
    props: {
        firstIconClass: String,
        secondIconClass: String
    },
    data() {
        return {
            showFirstIcon: true,
        };
    },
    computed: {
        currentIconClass() {
            return this.showFirstIcon ? this.firstIconClass : this.secondIconClass;
        }
    },
    methods: {
        toggleIcon() {
            this.showFirstIcon = !this.showFirstIcon;
            this.$emit("toggle"); // Emit the event to toggle layout class
        },
    }
};
</script>
  