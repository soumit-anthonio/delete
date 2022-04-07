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
        <input type="text" id="textb" v-model="txtModel" />
        <soumit-custom-box
          box-type="text"
          field-id="soumit_ID"
          css-class="soumit_class"
          place-holder="Text Placeholder"
          :value="txtModel"
          @input="soumitClick"
        ></soumit-custom-box>
        <soumit-custom-box
          box-type="password"
          field-id="soumit_ID"
          css-class="soumit_class_pas"
          place-holder="Password Place Holder"
          :value="txtModel"
          @input="soumitClickPassword"
        ></soumit-custom-box>

        <div v-if="list">
          <h1>Debounce</h1>
          <input
            type="text"
            v-model="textComputed"
            placeholder="search by name"
            style="position: relative;left: 9px;"
          />
          <div v-if="!mobileView" class="experiment-desktop">
            <table class="table table-hover">
              <tr class="header">
                <td>Name</td>
                <td>Tech</td>
                <td>Sub</td>
              </tr>
              <tr v-for="item in list" v-bind:key="item._id">
                <td>{{ item.name }}</td>
                <td>{{ item.tech }}</td>
                <td>{{ item.sub }}</td>
              </tr>
            </table>
          </div>
          <div v-if="mobileView" class="experiment-mobile">
            <table class="table table-hover">
              <tr class="header">
                <td>Name</td>
              </tr>
              <tr v-for="item in list" v-bind:key="item._id">
                <td>{{ item.name }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../assets/js/services/EventService";
import _ from "underscore";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";
import CustomBox from "../controls/custombox/CustomBox.vue";

export default {
  name: "Experiment",
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
    "soumit-custom-box": CustomBox,
  },
  data() {
    return {
      text: "",
      list: undefined,
      mobileView: true,
      showNav: false,
      txtModel: "Soumit Text",
      checked: true,
    };
  },
  methods: {
    soumitClick(value) {
      console.warn("Soumit Click", value);
    },
    soumitClickPassword(value) {
      console.warn("Soumit Click Password", value);
    },
    apiCall(text) {
      apiClient
        .get("/aliens/" + text, {
          headers: {
            //Authorization: "Bearer" + "Your Bearer Pssword",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.warn(response);
          this.list = response.data;
        });
    },
  },
  computed: {
    textComputed: {
      get() {
        return this.text;
      },
      set: _.debounce(function (newValue) {
        this.text = newValue;
        this.apiCall(this.text);
      }, 50),
    },
  },
  mounted() {
    //DOM ready
    this.apiCall("");
  },
};
</script>

<style lang="css" scoped>
.experiment-desktop {
  height: 450px;
  max-height: 450px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  background-color: #a9a9a7;
  border-radius: 30px;
  width: 1304px;
}
.experiment-mobile {
  height: 295px;
  max-height: 450px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  background-color: #a9a9a7;
  border-radius: 30px;
  width: 100%;
}
.header {
  background-color: #000;
  color: #fff;
  font-weight: bold;
}
.soumit_class {
  font-weight: bold;
}
.soumit_class_pas {
  color: red;
}
</style>
