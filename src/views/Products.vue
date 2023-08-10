<template>
    <BaseLayout>
        <div id="product-content" class="content">
            <ProductList />
        </div>
    </BaseLayout>
</template>
  
<script>
import { defineComponent } from 'vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import ProductList from '@/components/ProductList.vue';

export default defineComponent({
    components: {
        BaseLayout,
        ProductList,
    },
});
</script>