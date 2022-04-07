<template>
  <div id="navigation-mobile">
    <div class="search">
      <!-- <input type="text" placeholder="Search..." />
      <i class="fas fa-search"></i> -->
      <div class="logo"></div>
    </div>
    <ul class="ul-mobile-view">
      <li><router-link tag="li" class="li-class" to="/">Home</router-link></li>
      <li>
        <router-link tag="li" class="li-class" to="/login">Login</router-link>
      </li>
      <li>
        <router-link tag="li" class="li-class" to="/tranasction"
          >Transaction</router-link
        >
      </li>
      <li>
        <router-link tag="li" class="li-class" to="/balanceenquery"
          >Passbook</router-link
        >
      </li>
      <li>
        <router-link tag="li" class="li-class" to="/balancecheck"
          >Balance</router-link
        >
      </li>
      <li>
        <router-link tag="li" class="li-class" to="/note"
          >Note</router-link
        >
      </li>
       <li>
        <router-link tag="li" class="li-class" to="/alertnotification"
          >Notification</router-link
        >
      </li>
      <li v-if="adminView">
        <router-link tag="li" class="li-class" to="/users">Users</router-link>
      </li>
      <li>
        <router-link tag="li" class="li-class" to="/sitemap"
          >Site Map</router-link
        >
      </li>
      <li>
        <router-link tag="li" class="li-class" to="/logout">Logout</router-link>
      </li>
    </ul>
    <div class="social-media">
      <i class="fab fa-twitter"></i>
      <i class="fab fa-instagram"></i>
      <i class="fab fa-pinterest"></i>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "NavigationMobile",
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
  created() {
    //console.warn(this.store.getters.getRoleName());
    this.adminView = this.store.getters.getRoleName() == "Admin";
  },
  mounted() {
    this.adminView = this.store.getters.getRoleName() == "Admin";
  },
  data() {
    return {
      adminView: false,
    };
  },
};
</script>

<style lang="css" scoped>
#navigation-mobile {
  padding: 20px 0 0 0;
}
ul {
  list-style: none;
  width: 200px;
  padding-left: 40px;
  line-height: 26px;
  font-family: cursive;
}
li {
  color: #2d1a1a;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
}
li:hover {
  color: #111;
}
.li-class {
  color: #2d1a1a;
  font-size: 2rem;
  cursor: pointer;
  text-decoration: none;
}
.li-class:hover {
  color: #d6d857;
}

.search {
  position: relative;
  width: 240px;
  margin-bottom: 20px;
  padding-left: 20px;
}
input {
  border: none;
  outline: none;
  width: 180px;
  padding: 10px 50px 10px 20px;
  margin: 0;
  border-radius: 20px;
  background-color: #efefef;
  font-family: "Segoe UI", Tahoma;
  font-size: 1rem;
}

i {
  position: absolute;
  right: 31px;
  top: 6px;
  font-size: 1.6rem;
  color: #aaa;
  cursor: pointer;
}

.social-media {
  position: absolute;
  left: 40px;
  bottom: 20px;
}
i {
  margin: 0 20px 0 0;
  color: #4b292e;
  font-size: 2rem;
}
.logo {
  position: relative;
  right: 33px;
  top: -25px;
  width: 100%;
  max-width: 216px;
  height: 150px;
  margin-bottom: 8px;
  background-size: cover;
  background-position: top;
  background-image: url("../../assets/logo_soumit.png");
}
</style>
