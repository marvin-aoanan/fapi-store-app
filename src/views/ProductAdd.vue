<template>
    <BaseLayout>
        <div id="add-product-content" class="content">
            <AddProduct />
        </div>
    </BaseLayout>
</template>
  
<script>
import { defineComponent } from 'vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import AddProduct from '@/components/AddProduct.vue';

export default defineComponent({
    components: {
        BaseLayout,
        AddProduct,
    },
});
</script>