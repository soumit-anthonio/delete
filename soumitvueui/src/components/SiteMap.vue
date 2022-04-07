<template>
  <div>
    <NavigationMobile />
    <div class="content" :class="{ open: showNav }">
      <div class="top-bar">
        <div id="navigation-icon" v-if="mobileView" @click="showNav = !showNav">
          <i class="fas fa-bars"></i>
           <span class="userMobileHead"> {{ userName }}</span>
        </div>
        <Navigation v-if="!mobileView" />
      </div>
      <div class="container links">
        <h1>Site Map</h1>
        <router-link tag="li" to="/">
          <div class="links">Home</div>
        </router-link>
        <router-link tag="li" to="/login">
          <div class="links">Login</div>
        </router-link>
        <router-link tag="li" to="/other">
          <div class="links">Other</div>
        </router-link>
        <router-link tag="li" to="/balanceenquery">
          <div class="links">Balance Enquery</div>
        </router-link>
        <router-link tag="li" to="/experiment">
          <div class="links">Experiment (Debounce Functionality)</div>
        </router-link>
        <router-link tag="li" to="/register">
          <div class="links">Register</div>
        </router-link>
        <router-link tag="li" to="/graph">
          <div class="links">Graph</div>
        </router-link>
        <router-link tag="li" to="/counters">
          <div class="links">Counters</div>
        </router-link>
        <router-link tag="li" to="/balancecheck">
          <div class="links">Balancecheck</div>
        </router-link>
        <router-link tag="li" to="/tranasction">
          <div class="links">Tranasction</div>
        </router-link>
        <router-link tag="li" to="/users">
          <div class="links">Users</div>
        </router-link>
        <router-link tag="li" to="/weather">
          <div class="links">Read Weather</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";

export default {
  name: "SiteMap",
   setup() {
    const store = inject("store");
    const {
      counter,
      doubleCounter,
      addOne,
      userNameAndAddress,
      userName,
      getUserLocation,
    } = intermittenServiceAPI(store);

    onMounted(() => {
      getUserLocation();
    });

    return {
      store,
      counter,
      doubleCounter,
      addOne,
      userNameAndAddress,
      userName,
      getUserLocation,
    };
  },
  components: {
    Navigation,
    NavigationMobile,
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
   
  },
  data() {
    return { mobileView: true, showNav: false };
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
  font-family: cursive;
}
</style>
