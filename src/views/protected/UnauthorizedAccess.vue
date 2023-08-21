<template>
    <BaseLayout>
        <div id="product-content" class="content">
            <p>Unauthorized Access... will redirect to home page in {{ timer }}</p>
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
});
</script>