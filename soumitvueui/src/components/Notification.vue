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
        <div v-if="!showAddNotification" class="notifications mobile-view">
          <span v-on:click="toggleAddNotification()">Add Notification?</span>
          <NotificationItem
            v-for="(user_notification, i) in user_notifications_sorted"
            :notification="user_notification"
            :index="i"
            :key="i"
          />
        </div>
        <div v-if="showAddNotification" class="addNotification">
          <span v-on:click="toggleAddNotification()">View Notifications</span>
          <table>
            <tr>
              <td>
                <h3>{{ ucaseName }}</h3>
                <div>
                  <form @submit="alertDisplay" method="post">
                    <input
                      type="text"
                      placeholder="Subject"
                      v-model="notificationForm.subject"
                    />
                    <br /><br />
                    <textarea
                      v-model="notificationForm.notification"
                      name="notification"
                      placeholder="Enter Notification"
                      style="width: 262px; height: 255px"
                    ></textarea>
                    <br />
                    <input
                      type="checkbox"
                      name="active"
                      v-model="notificationForm.isShowInHomePage"
                    />
                    <span>Show in Home page?</span>
                    <input
                      type="number"
                      placeholder="Duration (in Months)"
                      v-model="notificationForm.duration"
                    />
                    <br /><br />
                    <button-control
                      :text="btnTextSubmit"
                      :typeBtn="defaultBtnType"
                    />
                  </form>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../assets/js/services/EventService";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { _ } from "vue-underscore";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";
import NotificationItem from "./NotificationItem.vue";
import Button from "../controls/button/button.vue";
import BtnTypeEnum from "../assets/js/services/enums/button-type";

export default {
  name: "Notification",
  setup() {
    const store = inject("store");
    const {
      counter,
      doubleCounter,
      addOne,
      userNameAndAddress,
      userName,
      getUserLocation,
      setNotifications
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
      setNotifications
    };
  },
  components: {
    Navigation,
    NavigationMobile,
    NotificationItem,
    "button-control": Button
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  mounted() {
    if (this.store.getters.getCandidateId()) {
      this.candidate_id = this.store.getters.getCandidateId();
      this.username = this.store.getters.getUserName();
      apiClient
        .get("/alienusers/transactionalert/" + this.candidate_id)
        .then((res) => {
          console.warn(res.data);
          if (res.data && res.data.length > 0) {
            _.forEach(res.data, function (item) {
              item["open"] = false;
              item["isShowOnHomePage"] = item.isShowInHomePage === "true";
            });
            console.warn(res.data);
            this.user_notifications_sorted = res.data.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            console.warn("User Notification Sorted..............");
            console.warn(this.user_notifications_sorted);
          }
        });
    } else {
      this.$swal.fire("You are not authenticated. Please login", "", "error");

      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    }
  },
  methods: {
    toggleAddNotification: function () {
      this.showAddNotification = !this.showAddNotification;
    },
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    alertDisplay(e) {
      e.preventDefault();
      if (this.username) {
        return new this.$swal({
          title: "<i>Notifications Warning</i>",
          // add a custom html tags by defining a html method.
          html: "Are you sure you want to add this notifications ",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            e.preventDefault();
            this.notificationForm.username = this.username;
            this.notificationForm.date = new Date();
            console.warn(this.notificationForm);
            e.preventDefault();
            apiClient
              .post(
                "/alienusers/transactionalert/" + this.candidate_id,
                this.notificationForm
              )
              .then((res) => {
                console.warn(res);
                this.setNotifications(2, (notificationData) => {
                  this.store.methods.setNotifications(notificationData);
                  this.$swal.fire(
                    "Notifications Succesfully Added! ",
                    "",
                    "success"
                  );
                  this.$router.push("/");
                });
              });
          }
        });
      } else {
        this.$swal.fire("You are not authenticated. Please login", "", "error");
        this.$router.push("/login");
      }
    },
  },
  data() {
    return {
      showAddNotification: false,
      textForLocUser: "",
      notificationForm: {
        username: null,
        subject: null,
        notification: null,
        isShowInHomePage: false,
        date: null,
        isResolved: false,
      },
      mobileView: true,
      showNav: false,
      name: "notification",
      candidate_id: null,
      user_notifications_sorted: null,
      defaultBtnType: BtnTypeEnum.Submit,
      btnTextSubmit: "Execute"
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
.notification {
  display: block;
  width: 100%;
  max-width: 768px;
  margin: 5px auto;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.notification .notificationText {
  position: relative;
  color: #3c3c3c;
  font-size: 20px;
  transition: all 0.4s linear;
}
.notification .notificationText::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%) rotate(0deg);
  width: 30px;
  height: 30px;
  background-image: url("../assets/arrow-down-mint.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  transition: all 0.2s linear;
}
.notification.open .notificationText {
  margin-bottom: 15px;
}
.notification.open .notificationText::after {
  transform: translateY(-50%) rotate(90deg);
}
.notification .date {
  color: #3c3c3c;
  font-size: 18px;
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  transition: all 0.4s ease-out;
}
.notification.open .date {
  opacity: 1;
  max-height: 1000px;
}
.mobile-view {
  display: block;
  height: 435px;
  overflow-y: scroll;
  width: 295px;
  margin-left: -15px;
}
</style>
