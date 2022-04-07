<template>
  <div>
    <table v-bind:class="{ tabl: !mobileView }">
      <tr>
        <td>
          <div id="content" v-bind:class="{ desktopContent: !mobileView }">
            <div class="teaser">
              <router-link to="/sitemap">
                <div class="teaser-content notification">
                  Pending No is : {{ notificationCount }}
                </div></router-link
              >

              <!-- <i class="fas fa-chevron-right"></i> -->
            </div>
            <div class="infobox">
              <div v-if="mobileView" class="weather-view-mob">
                <router-link tag="li" to="/weather">
                  <div class="teaser-content">{{ userName }}</div>
                </router-link>
              </div>
            </div>

            <div v-if="!mobileView">
              <div class="">
                <div class="title soumit-title font-define">{{ userName }}</div>
                <div class="value"></div>
              </div>
              <div class="infobox">
                <div class="title"></div>
                <div class="value"></div>
              </div>
              <div class="">
                <button class="lowDesign" @click="getUserLocation">
                  Click loc
                </button>
                <div class="value"></div>
              </div>
            </div>
            <div></div>
          </div>
        </td>
        <td v-if="!mobileView" class="weather-view">
          <div id="content">
            <div v-if="!mobileView" id="main" :class="isDay ? 'day' : 'night'">
              <div
                class="container my-5"
                style="max-width: 445px; min-width: 360px"
              >
                <!-- <h1 class="title text-center">Weather in</h1> -->
                <form class="search-location" v-on:submit.prevent="getWeather">
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
                    rounded-soumit
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
                  <div
                    class="card-top text-center"
                    style="margin-bottom: 15rem"
                  >
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
                    <div class="card-mid">
                      <div class="row">
                        <div class="col-12 text-center temp">
                          <span>{{ weather.temperature }}&deg;C</span>
                          <p class="my-4">{{ weather.description }}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col d-flex justify-content-between px-5 mx-5"
                        >
                          <p>
                            <img src="../../assets/down.svg" alt="" />
                            {{ weather.lowTemp }}&deg;C
                          </p>
                          <p>
                            <img src="../../assets/up.svg" alt="" />
                            {{ weather.highTemp }}&deg;C
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- card middle ends here -->

                    <!-- card bottom starts here -->
                    <div class="card-bottom px-5 py-4 row">
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
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import apiClient from "../../assets/js/services/EventService";
import config from "../../config";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../../compositionAPI/intermittenServiceAPI";
import { notify } from "@kyvg/vue3-notification";
import { _ } from "vue-underscore";

export default {
  name: "",
  setup() {
    const store = inject("store");
    const {
      counter,
      doubleCounter,
      addOne,
      userNameAndAddress,
      userName,
      getUserLocation,
      getNotifications,
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
      getNotifications,
    };
  },
  mounted() {
    const iptoken = config.iptoken;
    this.getInitialWeather(iptoken);
  },
  data: () => {
    return {
      notificationsToShow: [],
      notificationCount: 0,
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
  methods: {
    initialLoad() {
      notify({
        clean: true,
      });
      this.notificationsToShow = this.store.getters.getNotifications();
      this.notificationCount = this.store.getters.getNotificationCount();
      _.forEach(this.notificationsToShow, (element) => {
        element.dateExp = new Date(
          new Date(element.date).setDate(
            new Date(element.date).getDate() + parseInt(element.duration)
          )
        );
        if (element.isResolved == "false" && element.duration == "0") {
          notify({
            title: element.subject,
            text: element.notification,
            closeOnClick: false,
            position: "top right",
            duration: -1,
            type: "warn",
          });
        } else if (
          element.isResolved == "false" &&
          parseInt(element.duration) > 0 &&
          element.dateExp.getTime() >= new Date(element.date).getTime()
        ) {
          notify({
            title: element.subject,
            text: element.notification,
            closeOnClick: false,
            position: "top right",
            duration: -1,
            type: "warn",
          });
        }
      });
    },
    getInitialWeather(iptoken) {
      const iptrackApi = config.iptrackApi;
      apiClient.get(iptrackApi + `json?token=${iptoken}`).then((res) => {
        //console.warn(res);
        this.citySearch = res.data.city;
        this.getWeather(this.citySearch);
      });
    },
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    getWeather: async function (city) {
      const weatherKey = config.weatherKey;
      if (this.citySearch) {
        city = this.citySearch;
      }

      //console.log(this.citySearch);
      const apiWeather = config.apiWeather;
      //console.log(apiWeather);
      const baseURL =
        apiWeather + `weather?q=${city}&appid=${weatherKey}&units=metric`;
      //console.log(baseURL);
      //fetch weather
      try {
        const response = await fetch(baseURL);
        const data = await response.json();
        //console.log(data);
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
  components: {},
  created() {
    this.initialLoad();
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style lang="css" scoped>
.tabl {
  width: 1190px;
}
.weather-view {
  margin-left: 12px;
  width: 481px;
  position: relative;
  top: -154px;
  height: 190px;
  left: 78px;
}
.weather-view-mob {
  margin-left: 12px;
  width: 412px;
  position: relative;
  top: -88px;
  height: 190px;
}
.desktopContent {
  position: relative;
  top: -82px;
}
.teaser {
  position: relative;
  width: calc(100% - -191px);
  max-width: calc(100% - -191px);
  height: 370px;
  margin-bottom: 11px;
  background-image: url("../../assets/takeabreak.jpg");
  background-size: cover;
  background-position: top;
  border-radius: 20px;
  overflow: hidden;
}
.teaser-content {
  position: absolute;
  left: 10px;
  bottom: 37px;
  width: 250px;
  height: 50px;
  padding: 0 0 0 20px;
  background-color: #111;
  color: #efefef;
  border-radius: 30px;
  font-size: 2rem;
  cursor: pointer;
}
.notification {
  font-size: 26px;
}

i {
  font-size: 1.6rem;
}

.infobox {
  float: left;
  width: 80px;
  height: 3px;
  margin: 0 20px 20px 0;
  color: dimgrey;
}
.title {
  font-weight: bold;
}
.value {
  padding: 10px 0 0 0;
  font-size: 2rem;
}
.soumit-title {
  position: relative;
  left: -94px;
}
.font-define {
  font-family: monospace;
}
.lowDesign {
  position: relative;
  left: -90px;
  border-radius: 12px;
  background-color: burlywood;
}
.lowDesignMobile {
  position: relative;
  left: 104px;
  top: 175px;
  border-radius: 34px;
  background-color: #49bfed;
}
</style>
