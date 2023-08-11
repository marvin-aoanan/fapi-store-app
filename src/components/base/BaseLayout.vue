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
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet.insertRule(`
      :root { 
        --header-height: ${this.headerHeight}px;
        --nav-height: ${this.navHeight}px;
        --footer-height: ${this.footerHeight}px;
      }`
      );
    },
  },
  
});
</script>

<style>
#content {
  min-height: calc(100vh - var(--header-height, 0px) - var(--nav-height, 0px) - var(--footer-height, 0px));
  position: relative;
  overflow-x: hidden;
}
/* Other global styles */
</style>