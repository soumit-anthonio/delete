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
        <h3>Graph.....</h3>
        <h1>{{ store.state.counter }}</h1>
        <div
          class="card graph-card"
          style="width: 18rem; border-radius: 1.25rem; margin-bottom: 9px"
        >
          <div class="card-body">
            <div class="skill">
              <div class="outer">
                <div class="inner">
                  <div id="number">{{ percentage }}</div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stop-color="#e91e63" />
                    <stop offset="100%" stop-color="#673ab7" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="70" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="card">
          <h5 class="card-header">Sub Menu Three</h5>
          <div class="card-body">
            <p class="card-text">
              <render-control />
            </p>
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
import renderControl from "../controls/rendercontrol/rendercontrol.vue";

export default {
  name: "Graph",
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
    "render-control": renderControl,
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
  mounted() {
    let counter = 0;
    setInterval(() => {
      if (counter == this.referance) {
        clearInterval();
      } else {
        counter += 1;
        this.percentage = counter + "%";
      }
    }, 30);
  },
  data() {
    return {
      percentage: "",
      referance: 96,
      cssReference: 150,
      showNav: false,
      name: "Graph",
      adminView: false,
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
.container {
  width: 640px;
  padding-top: 20px;
  padding-left: 0px;
  padding-right: 0px;
  max-width: 640px;
}
.graph-card {
  background-color: #dee0c7;
  border-color: #dee0c7;
}
.lgraph {
  float: left;
  width: 180px;
  height: 350px;
}
.rgraph {
  float: right;
  width: 180px;
  height: 350px;
  background-color: #dee0c7;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #dee0c7;
}
.skill {
  width: 160px;
  height: 160px;
  position: relative;
}
.outer {
  height: 160px;
  width: 160px;
  border-radius: 50%;

  padding: 20px;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
    -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
}
.inner {
  background-color: var(--accent-color);
  height: 120px;
  width: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
    inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1),
    0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05);
}

#number {
  font-weight: 800;
  color: #555;
}

circle {
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 20px;
  stroke-dasharray: 472;
  stroke-dashoffset: 472;
  animation: anim 3s linear forwards;
}
svg {
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes anim {
  100% {
    /* 30 for 100 % now for 1 % change we need to increase this to 30 */
    stroke-dashoffset: 150;
  }
}
</style>
