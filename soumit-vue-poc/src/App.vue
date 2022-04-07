<template>
    <navigation-component :menuItems="applicationMenuItems"/>
    <router-view />
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
import NavigationComponent from './controls/navigation/navigation.vue';
export default {
  name: "App",
  components: {
    "navigation-component":NavigationComponent
  },
  data() {
    return {
       applicationMenuItems: [
        { name: "Home", link: "/", text: "Home", isDropdown: false },
        { name: "Soumit", link: "/soumit", text: "Soumit", isDropdown: false },
        {
          name: "Pricing",
          link: "/pricing",
          text: "Pricing",
          isDropdown: false,
        },
        {
          name: "SubMenu",
          link: "/",
          text: "SubMenu",
          isDropdown: true,
          submenu: [
            {
              name: "Soumit",
              link: "/submenu1",
              text: "Sub Menu One",
              isDropdown: false,
            },
            {
              name: "Soumit",
              link: "/submenu2",
              text: "Sub Menu Two",
              isDropdown: false,
            },
            {
              name: "Soumit",
              link: "/submenu3",
              text: "Sub Menu Three",
              isDropdown: false,
            },
          ],
        },
      ],
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
