<template>
    <BaseLayout>
        <div id="product-content" class="content">
            <ProductDetail />
        </div>
    </BaseLayout>
</template>
  
<script>
import { defineComponent } from 'vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import ProductDetail from '@/components/ProductDetail.vue';

export default defineComponent({
    components: {
        BaseLayout,
        ProductDetail,
    },
});
</script>