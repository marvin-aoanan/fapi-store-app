<template>
    <BaseLayout>
        <div id="product-content" class="content">
            <p>This is protected page....</p>
        </div>
    </BaseLayout>
</template>
  
<script>
import { defineComponent } from 'vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
//import ProductList from '@/components/ProductList.vue';

export default defineComponent({
    components: {
        BaseLayout,
    },
});
</script>