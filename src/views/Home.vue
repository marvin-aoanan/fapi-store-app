<template>
    <BaseLayout :appData="appData">
        <div id="home-content" class="content">
            <div class="section-wrapper">
                <div class="custom-background background-video">
                    <video src="../assets/images/a0407fd778.mp4" playsinline="" poster="" preload="none" autoplay="true"
                        muted="" loop="" data-filter="a0407fd778" crossorigin="anonymous"></video>
                </div>
                <div class="section-content">
                    <div class="welcome-message">
                        <h2>{{ appData.message }} Welcome to {{ appData.siteName }}!</h2>
                    </div>
                </div>
            </div>
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
    padding: 0;
    text-align: center;
}
.section-wrapper {
    position: relative;
}
.custom-background video {
    width: 100%;
    height: calc(100vh - var(--header-height, 0px) - var(--nav-height, 0px) - var(--footer-height, 0px));
    display: block;
    object-fit: cover;
}

.section-content {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    margin: 0 auto;
    padding: 0 24px;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
}

.welcome-message h2 {
    color: white;
}
</style>