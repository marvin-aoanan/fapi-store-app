<template>
    <BaseLayout>
        <div id="add-product-content" class="content">
            <UpdateProduct />
        </div>
    </BaseLayout>
</template>
  
<script>
import { defineComponent } from 'vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import UpdateProduct from '@/components/UpdateProduct.vue';

export default defineComponent({
    components: {
        BaseLayout,
        UpdateProduct,
    },
});
</script>