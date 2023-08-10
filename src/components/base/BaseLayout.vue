<template>
  <main id="main">
    <HeaderSection @headerHeight="setHeaderHeight" :appData="appData" />
    <NavSection @navHeight="setNavHeight" />
    <div id="content" class="content">
      <slot></slot>
    </div>
    <FooterSection @footerHeight="setFooterHeight" :appData="appData" />
  </main>
</template>
  
<script>
import { defineComponent } from 'vue';
import HeaderSection from './HeaderSection.vue';
import NavSection from './NavSection.vue';
import FooterSection from './FooterSection.vue';

export default defineComponent({
  name: 'BaseLayout',
  components: {
    HeaderSection,
    NavSection,
    FooterSection,
  },
  props: {
    appData: Object
  },
  data() {
    return {
      headerHeight: 0,
      navHeight: 0,
      footerHeight: 0,
    };
  },
  methods: {
    setHeaderHeight(height) {
      this.headerHeight = height;
      this.updateCSSVariables();
    },
    setNavHeight(height) {
      this.navHeight = height;
      this.updateCSSVariables();
    },
    setFooterHeight(height) {
      this.footerHeight = height;
      this.updateCSSVariables();
    },
    updateCSSVariables() {
      document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
      document.documentElement.style.setProperty('--nav-height', `${this.navHeight}px`);
      document.documentElement.style.setProperty('--footer-height', `${this.footerHeight}px`);
    },
  },
  
});
</script>

<style>
:root {
  --header-height: 0;
  --nav-height: 0;
  --footer-height: 0;
}

#content {
  min-height: calc(100vh - var(--header-height) - var(--nav-height) - var(--footer-height));
}
/* Other global styles */
</style>