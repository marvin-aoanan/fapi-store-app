<template>
    <BaseLayout>
        <div id="home-content" class="content">
            <div class="section-wrapper">
                <div class="custom-background background-video">
                    <video src="../assets/images/a0407fd778.mp4" playsinline="" poster="" preload="none" autoplay="true"
                        muted="" loop="" data-filter="a0407fd778" crossorigin="anonymous"></video>
                </div>
                <div class="section-content">
                    <div class="welcome-message">
                        <h2> Welcome, {{ message }}!</h2>
                    </div>
                    <LoginUser />
                </div>
            </div>
        </div>
    </BaseLayout>
</template>
  
<script>
import { mapGetters, mapState } from 'vuex';
import BaseLayout from '@/components/base/BaseLayout.vue';
import LoginUser from '@/components/LoginUser.vue';

export default {
    components: {
        BaseLayout,
        LoginUser,
    },
    computed: {
        ...mapState(['activity']),
        ...mapGetters(['getAppData', 'isLoggedIn', 'getUserName']),
        appData() {
            return this.getAppData;
        },
        message() {
            const message = this.getAppData.message;
            return this.isLoggedIn ? message.welcome + '' + this.userName : 'Visitor';
        },
        userName() {
            // Access the user's name from your user module in Vuex
            // For example: this.$store.state.user.name
            return this.getUserName || ''; // Use an empty string as default
        },
    },

};
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