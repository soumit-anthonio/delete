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
      <div class="container">
        <h3>Wallet Balance</h3>
        <div
          v-if="candidate_id"
          class="card lgraph"
          style="width: 18rem; border-radius: 1.25rem; margin-bottom: 9px"
        >
          <div class="card-body">
            <h5 class="card-title">
              Welcome
              <span class="signature">{{ firstName }} {{ lastName }} </span>
            </h5>
            <p class="card-text">
              <a href="#" class="card-link"
                ><strong>{{ data_balances }}/-</strong></a
              >
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              As On <strong>{{ formatDate() }}</strong>
            </li>
            <li class="list-group-item">
              Please get the full passbook by clicking below.
            </li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link"></a>
            <router-link tag="li" class="card-link" to="/balanceEnquery"
              >Passbook</router-link
            >

            <router-link
              v-if="adminView"
              tag="li"
              class="card-link"
              to="/users"
              title="User Details"
              ><i class="fas fa-users-cog"></i
            ></router-link>
            <router-link
              v-if="mobileView"
              tag="li"
              class="card-link"
              to="/graph"
              title="User Details"
              ><i class="fas fa-chart-pie"></i
            ></router-link>
          </div>
        </div>
        <div
          class="card rgraph"
          v-if="!mobileView"
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
    </div>
  </div>
</template>

<script>
import apiClient from "../assets/js/services/EventService";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";

export default {
  name: "Login",
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
    console.warn(this.store.getters.getRoleName());
    this.adminView = this.store.getters.getRoleName() == "Admin";
    //this.cssreference = (100 + this.referance);
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    formatDate() {
      return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date()
      );
    },
  },
  mounted() {
    this.adminView = this.store.getters.getRoleName() == "Admin";

    let counter = 0;
    // this.cssreference = (100 + this.referance);
    setInterval(() => {
      if (counter == this.referance) {
        clearInterval();
      } else {
        counter += 1;
        this.percentage = counter + "%";
      }
    }, 30);

    if (this.store.getters.getCandidateId()) {
      this.candidate_id = this.store.getters.getCandidateId();
      this.firstName = this.store.getters.getFirstName();
      this.lastName = this.store.getters.getLastName();
      apiClient
        .get("/alienusers/balanceenquery/" + this.candidate_id)
        .then((res) => {
          console.warn(res);
          this.data_balances = res.data;
        });
    } else {
      this.$swal.fire("You are not authenticated. Please login", "", "error");
      this.name =
        "Your credentials are not valid. You will be redirected to the LOGIN page shortly....";
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    }
  },
  data() {
    return {
      percentage: "",
      referance: 96,
      cssReference: 150,
      firstName: null,
      lastName: null,
      candidate_id: null,
      data_balances: null,
      mobileView: true,
      showNav: false,
      name: "balance check",
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
.register {
  margin-left: 12px;
}
.signature {
  font-weight: bold;
  font-size: 20px;
}
.container {
  width: 640px;
  padding-top: 20px;
  padding-left: 0px;
  padding-right: 0px;
  max-width: 640px;
}
.lgraph {
  float: left;
  /* width: 340px !important; */
  height: 350px;
  /* max-width: 340px; */
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
