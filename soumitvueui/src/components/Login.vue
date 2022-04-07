<template>
  <div>
    <NavigationMobile />
    <div class="content" :class="{ open: showNav }">
      <div class="top-bar">
        <div id="navigation-icon" v-if="mobileView" @click="showNav = !showNav">
          <i class="fas fa-bars"></i>
        </div>
        <Navigation v-if="!mobileView" />
      </div>
      <div class="container">
        <table>
          <tr>
            <td>
              <h3>{{ ucaseName }}</h3>
              <div>
                <form @submit="submitData" method="post">
                  <input
                    type="text"
                    v-model="loginForm.username"
                    name="username"
                    placeholder="enter user name"
                  />
                  <br /><br />
                  <input
                    type="password"
                    v-model="loginForm.password"
                    name="password"
                    placeholder="enter password"
                  />
                  <br /><br />
                   <button-control
                      :text="btnTextSubmit"
                      :typeBtn="defaultBtnType"
                    />
                  <router-link tag="li" class="li-class register" to="/register"
                    ><span>Register</span></router-link
                  >
                </form>
              </div>
              <br /><br />
              <VueSoumitButton
                text="Go Back To Google.... !"
                link="https://google.com"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiClient from "../assets/js/services/EventService";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { _ } from "vue-underscore";
import VueSoumitButton from "vue-soumit-button";
import { inject } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";
import Button from "../controls/button/button.vue";
import BtnTypeEnum from "../assets/js/services/enums/button-type";

export default {
  name: "Login",
  setup() {
    const store = inject("store");
    const { setNotifications } = intermittenServiceAPI(store);
    return {
      store,
      setNotifications,
    };
  },
  components: {
    Navigation,
    NavigationMobile,
    VueSoumitButton,
    "button-control": Button,
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
      this.store.methods.clearState();
    },
    loginDa() {
      console.log(
        "Login data",
        this.loginForm.username,
        this.loginForm.password
      );
    },
    submitData(e) {
      this.store.methods.clearState();
      console.warn(this.loginForm);
      e.preventDefault();
      const reqUser = apiClient.post("/alienusers/login", this.loginForm);
      const reqUserRoles = apiClient.get("/alienuserrole");
      const reqRoles = apiClient.get("/alienroles");

      axios
        .all([reqUser, reqUserRoles, reqRoles])
        .then(
          axios.spread((...responses) => {
            console.warn(responses);
            const responseUser = responses[0].data;
            const responseUserRoles = responses[1].data;
            const responesRoles = responses[2].data;
            console.warn(responseUser);
            if (
              typeof responseUser === "string" &&
              responseUser.match(/User not authenticated.*/)
            ) {
              this.$swal.fire(
                "Your username or password are not correct! ",
                "",
                "error"
              );
            } else if (
              typeof responseUser === "string" &&
              responseUser.match(/User not existed,*/)
            ) {
              this.$swal.fire(
                "You are not registered in this system. Please use Register link to register! ",
                "",
                "error"
              );
            } else {
              const userResponse = responseUser;
              this.store.methods.setCandidateId(userResponse._id);
              this.store.methods.setFirstName(userResponse.fname);
              this.store.methods.setLastName(userResponse.lname);
              this.store.methods.setUserName(userResponse.username);
              this.setNotifications(2, (notificationData) => {
                const userRole = _.find(responseUserRoles, function (userrole) {
                  return userrole.userid === userResponse._id;
                });
                const role = _.find(responesRoles, function (role) {
                  return role._id === userRole.roleid;
                });
                userResponse.rolename = role.rolename;
                this.store.methods.setRoleName(role.rolename);
                 this.store.methods.setNotifications(notificationData);
                this.$router.push("/");
              });
            }
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    },
    trailingpartLogin(responseUserRoles, responesRoles, userResponse) {
      const userRole = _.find(responseUserRoles, function (userrole) {
        return userrole.userid === userResponse._id;
      });
      const role = _.find(responesRoles, function (role) {
        return role._id === userRole.roleid;
      });
      userResponse.rolename = role.rolename;
      this.store.methods.setRoleName(role.rolename);
      this.$router.push("/");
    },
  },
  data() {
    return {
      loginForm: {
        username: null,
        password: null,
      },
      mobileView: true,
      showNav: false,
      name: "login form",
      defaultBtnType: BtnTypeEnum.Submit,
      btnTextSubmit: "Login",
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
</style>
