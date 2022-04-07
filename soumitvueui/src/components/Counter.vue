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
      <div>
        <h3>Counter.....</h3>
        <div
          class="card graph-card"
          style="width: 18rem; border-radius: 1.25rem; margin-bottom: 9px"
        >
          <div class="card-body">
            <div class="counter">
              {{ store.state.counter }}
            </div>
            <div class="counter-square">
              {{ store.state.counter }}
              <sup>2</sup> = {{ store.getters.counterSquared() }}
            </div>
            <div class="buttons">
              <button v-on:click="store.methods.decreaseCounter">-</button>
              <button v-on:click="store.methods.increaseCounter">+</button>
            </div>
          </div>
        </div>
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
  name: "Counter",
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
    return {
      showNav: false,
      name: "Counter",
    };
  },
};
</script>
<style scoped>
div {
  margin-bottom: 10px;
}
.counter {
  font-size: 80px;
  text-align: center;
  padding: 10px;
}
.counter-square {
  font-size: 20px;
  text-align: center;
  padding: 10px;
}
.buttons button {
  font-size: 40px;
  width: 100px;
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>