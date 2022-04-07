<template>
<notifications/>
 
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { provide } from "vue";
import store from "./store";

export default {
  name: "App",
  setup() {
    provide("store", store);
  },
};
</script>

<style lang="css">
@import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");

* {
  font-size: 1rem;
  font-family: cursive;
  /* font-family: "cursive","Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif; */
}

body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "cursive", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  background-color: #7ca971;
}

#app {
  position: relative;
  width: calc(100% - -19px);
  height: calc(100vh - 12px);
  padding: 10px;
  color: #333;
  overflow: hidden;
}
.userMobileHead {
  font-weight: bold;
  position: relative;
  font-size: 1.5rem;
  top: -5px;
  left: 15px;
}

.top-bar {
  display: flex;
  width: 100%;
}

#navigation-icon {
  padding: 10px 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}
#navigation-icon i {
  font-size: 2rem;
}

.content {
  position: absolute;
  top: 10px;
  width: calc(100% - 60px);
  height: calc(100vh - 32px);
  padding: 20px;
  background-color: #dee0c7;
  border-radius: 30px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  transition: 1s transform cubic-bezier(0, 0.12, 0.14, 1);
}

.open {
  transform: translateX(300px);
}

.vue-notification-template{
    border-radius: 23px;
    margin-top: 20px;
    margin-right: 22px;
}
</style>
