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
        <h1>This is Soumit Home</h1>
        <h2>{{ data }}</h2>
        <h3>{{ msg }}</h3>
        <h3>{{ name }}</h3>
        <h3 v-once>{{ name }}</h3>
        <button v-on:click="clickSoumit">click me</button>
        <h1 v-if="show">Conditional If statement</h1>
        <h1 v-else>Conditional Else statement</h1>
        <button v-on:click="display()">Toggle if Else</button>
        <br />
        <br />
        <button v-on:click="hello('test')" v-on:mouseover="helloHover('test')">
          Click Me !!!!
        </button>

        <br /><br />
        <User />
        <br /><br />
        <Product name="Soumit Prop value" v-bind:bindName="productName" />
        <br /><br />
        <DataBind v-on:changeTitle="updateChangeTitle($event)" />
        <br /><br />
        <h3>{{ title }}</h3>
        <table>
          <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>EMAIL</td>
          </tr>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import User from "./Users.vue";
import Product from "./Product.vue";
import DataBind from "./DataBind.vue";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";

export default {
  name: "Home Component",
  setup() {
    const store = inject("store");
    const {
      userName,
      notificationCount,
      getUserLocation,
    } = intermittenServiceAPI(store);

    onMounted(() => {
      console.log("mounted in the composition api!");
      getUserLocation();
    });

    return {
      store,
      userName,
      notificationCount,
      getUserLocation,
    };
  },
  props: {
    data: String,
    msg: String,
  },
  components: {
    Navigation,
    NavigationMobile,
    User,
    Product,
    DataBind,
  },
  created() {
    console.log("CREATED");
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  mounted() {
    console.log("MOUNTED");
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    hello(arg) {
      console.log("Soumit hello click called.................", arg);
    },
    helloHover(arg) {
      console.log("Soumit hello hover called.................", arg);
    },
    display() {
      this.show = !this.show;
    },
    clickSoumit() {
      this.name = "Soumit123";
    },
    updateChangeTitle(title) {
      this.title = title;
    },
  },
  data() {
    return {
      show: true,
      mobileView: true,
      showNav: false,
      title: "Props tutorial",
      users: [
        { id: 1, name: "peter1", email: "peter1@test.com" },
        { id: 2, name: "peter2", email: "peter2@test.com" },
        { id: 3, name: "peter3", email: "peter3@test.com" },
      ],
      name: "Soumit",
      productName: "Soumit Sam",
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
div {
  background-color: #1e77d261;
  height: 2300px;
}
</style>
