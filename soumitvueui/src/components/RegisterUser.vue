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
      <div>
        <table>
          <tr>
            <td>
              <h3>{{ ucaseName }}</h3>
              <div>
                <form @submit="submitData" method="post">
                  <input
                    type="text"
                    v-model="registerForm.username"
                    name="username"
                    placeholder="enter user name"
                  />
                  <br /><br />
                  <input
                    type="password"
                    v-model="registerForm.password"
                    name="password"
                    placeholder="enter password"
                  />
                  <br /><br />
                  <input
                    type="text"
                    v-model="registerForm.fname"
                    name="fname"
                    placeholder="enter fname"
                  />
                  <br /><br />
                  <input
                    type="text"
                    v-model="registerForm.mname"
                    name="mname"
                    placeholder="enter mname"
                  />
                  <br /><br />
                  <input
                    type="text"
                    v-model="registerForm.lname"
                    name="lname"
                    placeholder="enter lname"
                  />
                  <br /><br />
                  <vue-soumit-dropdown
                    :text="text_headline_for_gender"
                    :items="gender_details"
                    v-on:onSelectedClickEvent="onItemSelectedClickEvent($event)"
                  />
                  <br /><br />
                  <textarea
                    v-model="registerForm.description"
                    name="description"
                    placeholder="enter description"
                    style="width: 290px"
                  ></textarea>
                  <br />
                  <button-control
                    :text="btnTextRegister"
                    :typeBtn="registerBtnType"
                  />
                </form>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../assets/js/services/EventService";
import { inject } from "vue";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import VueSoumitDropdown from "vue-soumit-dropdown";
import Button from "../controls/button/button.vue";
import BtnTypeEnum from "../assets/js/services/enums/button-type";

export default {
  name: "Register",
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
  components: {
    Navigation,
    NavigationMobile,
    VueSoumitDropdown,
    "button-control": Button,
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  methods: {
    onItemSelectedClickEvent(event) {
      console.log(event);
      this.registerForm.gender = event;
    },
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    submitData(e) {
      console.warn(this.registerForm);
      e.preventDefault();
      apiClient.post("/alienusers/register", this.registerForm).then((res) => {
        console.warn(res);
        if (res.data === "user_exist") {
          this.name =
            "User already present in the system.... Please login with the credential....";
        } else {
          const tt = res.data._id;
          console.warn(tt);
          //local1Storage.candidate_id = null;
          this.store.methods.setCandidateId(null);
          return new this.$swal({
            title: "<i>User Registration</i>",
            // add a custom html tags by defining a html method.
            html: "You have succesfully register, now you will be redirected to the login page and please login with your user name and password.... ",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
          }).then((result) => {
            if (result.isConfirmed) {
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
            } else {
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
            }
          });
        }
      });
    },
  },
  data() {
    return {
      registerForm: {
        username: null,
        password: null,
        fname: null,
        mname: null,
        lname: null,
        gender: null,
        description: null,
        "button-control": Button,
      },
      mobileView: true,
      registerBtnType: BtnTypeEnum.Submit,
      btnTextRegister: "Register",
      showNav: false,
      name: "Register User",
      text_headline_for_gender: "Select Gender",
      gender_details: [
        "Male",
        "Female",
        "Does Not Want To Disclose",
        "Shemale",
        "Not Known",
        "Other",
      ],
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
  position: relative;
  top: -17px;
}
.selector {
  border: 1px solid gainsboro;
  background: #f8f8f8;
  position: relative;
  z-index: 1;
  left: -14px !important;
  width: 173px;
}
.label {
  display: block;
  /* padding: 12px; */
  font-size: 16px;
  color: #696868;
  border: 1px solid #696868;
  position: relative;
  /* margin-left: -14px; */
  padding-left: 5px;
}
</style>
