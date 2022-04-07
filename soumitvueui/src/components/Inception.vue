<template>
  <div>
    <NavigationMobile />
    <div class="content" :class="{ open: showNav }">
      <div class="top-bar">
        <div id="navigation-icon" v-if="mobileView" @click="showNav = !showNav">
          <i class="fas fa-bars"></i>
        </div>
        <Navigation v-if="!mobileView" />
      </div>
      <Content />
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Home from "./components/Home.vue";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import Content from "./awsome/Content.vue";
// import Inception from "./components/Inception.vue";

export default {
  name: "Inception",
  data: () => {
    return {
      mobileView: true,
      showNav: false,
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
  },
  components: {
    Navigation,
    NavigationMobile,
    Content,
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style lang="css" scoped>
</style>
