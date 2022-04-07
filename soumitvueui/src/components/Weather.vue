<template>
  <div v-if="mobileView">
    <NavigationMobile />
    <div class="content" :class="{ open: showNav }">
      <div class="top-bar">
        <div id="navigation-icon" v-if="mobileView" @click="showNav = !showNav">
          <i class="fas fa-bars"></i>
          <span class="userMobileHead"> {{ userName }}</span>
        </div>
        <Navigation v-if="!mobileView" />
      </div>
      <div v-if="mobileView" id="mainmobile" :class="isDay ? 'day' : 'night'">
        <div class="container my-5" style="max-width: 400px; min-width: 360px">
          <h1 class="title-mobile text-center">Weather in</h1>
          <form class="search-location-mobile" v-on:submit.prevent="getWeather">
            <input
              type="text"
              class="form-control text-muted form-rounded p-4 shadow-sm"
              placeholder="What City?"
              v-model="citySearch"
              autocomplete="off"
            />
          </form>
          <p class="text-center my-3" v-if="cityFound">No city found</p>
          <div
            class="
              card
              rounded
              my-3
              shadow-lg
              back-card
              overflow-hidden
              soumit-wether-panel
            "
            v-if="visible"
          >
            <!-- weather animation container -->
            <div>
              <div icon="sunny" v-if="clearSky" data-label="Sunny">
                <span class="sun"></span>
              </div>

              <div icon="snowy" v-if="snowy" data-label="Chilly">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>

              <div icon="stormy" v-if="stormy" data-label="Soggy">
                <span class="cloud"></span>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div icon="cloudy" v-if="cloudy" data-label="Perfect">
                <span class="cloud"></span>
                <span class="cloud"></span>
              </div>
              <div icon="nightmoon" v-if="clearNight" data-label="Cool!">
                <span class="moon"></span>
                <span class="meteor"></span>
              </div>
            </div>

            <!-- Top of card starts here -->
            <div class="card-top text-center" style="margin-bottom: 15rem">
              <div class="city-name my-3">
                <p>{{ weather.cityName }}</p>
                <span>...</span>
                <p class="">{{ weather.country }}</p>
              </div>
            </div>
            <!-- top of card ends here -->

            <!--card middle body, card body used cos I want to just update the innerHTML -->
            <div class="card-body">
              <!-- card middle starts here -->
              <div class="card-mid card-mid-mobile">
                <div class="row">
                  <div class="col-12 text-center temp">
                    <span>{{ weather.temperature }}&deg;C</span>
                    <p class="my-4">{{ weather.description }}</p>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col d-flex justify-content-between px-5 mx-5"
                    style="padding-left: 2rem !important"
                  >
                    <p>
                      <img src="../assets/down.svg" alt="" />
                      {{ weather.lowTemp }}&deg;C
                    </p>
                    <p>
                      <img src="../assets/up.svg" alt="" />
                      {{ weather.highTemp }}&deg;C
                    </p>
                  </div>
                </div>
              </div>
              <!-- card middle ends here -->

              <!-- card bottom starts here -->
              <div class="card-bottom px-5 py-4 row card-bottom-mobile">
                <div class="col text-center">
                  <p>{{ weather.feelsLike }}&deg;C</p>
                  <span>Feels like</span>
                </div>
                <div class="col text-center">
                  <p>{{ weather.humidity }}%</p>
                  <span>humidity</span>
                </div>
              </div>

              <!-- card bottom ends here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../assets/js/services/EventService";
import config from "../config";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";

export default {
  name: "Weather",
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
    window.addEventListener("resize", this.handleView);
  },
  mounted() {
    const iptoken = config.iptoken;
    this.getInitialWeather(iptoken);
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    getInitialWeather(iptoken) {
      const iptrackApi = config.iptrackApi;
      apiClient.get(iptrackApi + `json?token=${iptoken}`).then((res) => {
        console.warn(res);
        this.citySearch = res.data.city;
        this.getWeather(this.citySearch);
      });
    },
    getWeather: async function (city) {
      const weatherKey = config.weatherKey;
      console.log(this.citySearch);
      if (this.citySearch) {
        city = this.citySearch;
      }
      const apiWeather = config.apiWeather;
      const baseURL =
        apiWeather + `weather?q=${city}&appid=${weatherKey}&units=metric`;

      //fetch weather
      try {
        const response = await fetch(baseURL);
        const data = await response.json();
        console.log(data);
        this.citySearch = "";
        this.weather.cityName = data.name;
        this.weather.country = data.sys.country;
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.description = data.weather[0].description;
        this.weather.lowTemp = Math.round(data.main.temp_min);
        this.weather.highTemp = Math.round(data.main.temp_max);
        this.weather.feelsLike = Math.round(data.main.feels_like);
        this.weather.humidity = Math.round(data.main.humidity);

        const timeOfDay = data.weather[0].icon;

        ///check for time of day
        if (timeOfDay.includes("n")) {
          this.isDay = false;
        } else {
          this.isDay = true;
        }

        const mainWeather = data.weather[0].main;
        //check weather animations
        if (mainWeather.includes("Clouds")) {
          this.stormy = false;
          this.cloudy = true;
          this.clearSky = false;
          this.clearNight = false;
          this.snowy = false;
        }
        if (mainWeather.includes("Clouds")) {
          this.stormy = false;
          this.cloudy = true;
          this.clearSky = false;
          this.clearNight = false;
          this.snowy = false;
        }
        if (
          mainWeather.includes("Thunderstorm") ||
          mainWeather.includes("Rain")
        ) {
          this.stormy = true;
          this.cloudy = false;
          this.clearSky = false;
          this.clearNight = false;
          this.snowy = false;
        }
        if (mainWeather.includes("Clear") && this.isDay) {
          this.stormy = false;
          this.cloudy = false;
          this.clearSky = true;
          this.clearNight = false;
          this.snowy = false;
        }
        if (mainWeather.includes("Clouds") && !this.isDay) {
          this.stormy = false;
          this.cloudy = false;
          this.clearSky = false;
          this.clearNight = true;
          this.snowy = false;
        }
        if (mainWeather.includes("Snow")) {
          this.stormy = false;
          this.cloudy = false;
          this.clearSky = false;
          this.clearNight = false;
          this.snowy = true;
        }

        this.visible = true;
        this.cityFound = false;
      } catch (error) {
        console.log(error);
        this.cityFound = true;
        this.visible = false;
      }
    },
  },
  data() {
    return {
      mobileView: true,
      showNav: false,
      name: "weather form",
      cityFound: false,
      visible: false,
      stormy: false,
      cloudy: false,
      clearSky: false,
      clearNight: false,
      snowy: false,

      isDay: true,
      citySearch: "",
      weather: {
        cityName: "Gwarinpa",
        country: "NG",
        temperature: 12,
        description: "Clouds everywhere",
        lowTemp: "19",
        highTemp: "30",
        feelsLike: "20",
        humidity: "55",
      },
    };
  },
  computed: {},
};
</script>

<style lang="css" scoped>
@import "../assets/custom.css";
@import "../assets/animation.css";
.register {
  margin-left: 12px;
}
</style>
