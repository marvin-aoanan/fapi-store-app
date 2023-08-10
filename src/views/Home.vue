<template>
    <BaseLayout :appData="appData">
        <div id="home-content" class="content">
            <h2>{{ appData.message }} Welcome to {{ appData.siteName }}!</h2>
        </div>
    </BaseLayout>
</template>
  
<script>
import { defineComponent } from 'vue';
import BaseLayout from '@/components/base/BaseLayout.vue';

export default defineComponent({
    components: {
        BaseLayout,
    },
    props: { 
        appData: Object
    },
});
</script>

<style scoped>
#home-content {
    padding: 20px;
    text-align: center;
}
#home-content h2 {
    padding-top: 40px;
}
</style>