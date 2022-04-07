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
      <div class="container">
        <h1 class="farewell">{{ farewel_message }}</h1>
        <br /><br />
        <h1 class="farewell">{{ farewel_advice }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { inject } from "vue";

export default {
  name: "Logout",
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
  components: {
    Navigation,
    NavigationMobile,
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
    this.store.methods.clearState();
    setTimeout(() => {
      this.$router.push("/login");
    }, 3000);
  },
  mounted() {
    this.store.methods.clearState();
    setTimeout(() => {
      this.$router.push("/login");
    }, 3000);
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
  },
  data() {
    return {
      mobileView: true,
      showNav: false,
      farewel_message: "We are sorry to log you out..... ",
      farewel_advice: "Please come back soon.....",
    };
  },
  computed: {
    ucaseName() {
      return this.name.toUpperCase();
    },
  },
};
</script>

<style lang="css" scoped>
.links {
  color: #000;
}
.farewell {
  color: crimson;
}
</style>
