<template>
  <div class="notification">
    <div class="notificationSub">{{ notification.subject }}</div>
    <div class="notificationText">{{ notification.notification }}</div>
    <input
      type="checkbox"
      :value="notification.isShowOnHomePage"
      id="notificationp._id"
      v-model="notiModel"
      @change="check($event, notification)"
    />
    <span>Show On Home page?</span><br />
    <span>Duration (in Months) {{ notification.duration }}</span>
    <div class="days">
      <input type="text" id="notificationp.duration" v-model="durationData" />
    </div>
    <div class="date">
      <span
        >Created on <b>{{ formatDate(notification.date) }}</b></span
      ><br />
      <date-picker :datepickerProp="datePickerObject" />
    </div>
    <br />
    <button-control
      :text="btnTextUpdate"
      :typeBtn="updateBtnType"
      v-on:btnClicked="updateDuration($event, notification)"
    />
    <!-- <input
      type="button"
      @click="updateDuration($event, notification)"
      value="Update"
    /> -->
    <button-control
      :text="btnTextDelete"
      :typeBtn="deleteBtnType"
      :childclass="{ deleteclassadditionalstyle: true }"
      v-on:btnClicked="deleteNotification($event, notification)"
    />
    <!-- <input
      type="button"
      class="margin-left-12"
      @click="deleteNotification($event, notification)"
      value="Delete"
    /> -->
  </div>
</template>
<script>
import apiClient from "../assets/js/services/EventService";
import { inject } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";
import DatePicker from "../controls/datepicker/DatePicker.vue";
import { ref } from "vue";
import Button from "../controls/button/button.vue";
import BtnTypeEnum from "../assets/js/services/enums/button-type";

export default {
  name: "Notification",
  props: { notification: Object, index: Number, key: Number },
  setup() {
    const store = inject("store");
    const { setNotifications } = intermittenServiceAPI(store);
    return {
      store,
      setNotifications,
    };
  },
  created() {
    this.notiModel = this.notification.isShowOnHomePage;
    this.durationData = this.notification.duration;
    this.creationDate = this.notification.date;
  },
  components: {
    "date-picker": DatePicker,
    "button-control": Button
  },
  data() {
    return {
      notiModel: null,
      durationData: "",
      creationDate: "",
      datePickerObject: {
        picked: ref(new Date(this.notification.date)),
        to: new Date(),
        from: new Date("2013-01-01T01:01:00.000+00:00"),
      },
      updateBtnType: BtnTypeEnum.Primary,
      btnTextUpdate: "Update",
      deleteBtnType: BtnTypeEnum.Danger,
      btnTextDelete: "Delete"
    };
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(date)
      );
    },
    check(evnt, notific) {
      const reqBody = {
        isShowOnHomePage: this.notiModel,
        duration: this.durationData,
        creationDate: this.datePickerObject.picked,
      };
      console.log(evnt, notific);
      apiClient
        .patch("/alienusers/transactionalert/" + notific._id, reqBody)
        .then((res) => {
          console.warn(res);
          this.setNotifications(2, (notificationData) => {
            this.store.methods.setNotifications(notificationData);
            this.$swal.fire(
              "Notifications Succesfully Updated! ",
              "",
              "success"
            );
            this.$router.push("/");
          });
        });
    },
    updateDuration(evnt, notific) {
      const reqBody = {
        isShowOnHomePage: notific.isShowOnHomePage,
        duration: parseInt(this.durationData),
        creationDate: this.datePickerObject.picked,
      };
      console.log(evnt, notific);
      apiClient
        .patch("/alienusers/transactionalert/" + notific._id, reqBody)
        .then((res) => {
          console.warn(res);
          this.setNotifications(2, (notificationData) => {
            this.store.methods.setNotifications(notificationData);
            this.$swal.fire(
              "Notifications Succesfully Updated! ",
              "",
              "success"
            );
            this.$router.push("/");
          });
        });
    },
    deleteNotification(evnt, notific) {
      console.log(evnt, notific);
      return new this.$swal({
        title: "<i>Notifications Warning</i>",
        html: "Are you sure you want to delete this notifications ",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          apiClient
            .delete("/alienusers/transactionalert/" + notific._id)
            .then((res) => {
              console.warn(res);
              this.setNotifications(2, (notificationData) => {
                this.store.methods.setNotifications(notificationData);
                this.$swal.fire(
                  "Notifications Succesfully Deleted! ",
                  "",
                  "success"
                );
                this.$router.push("/");
              });
            });
        }
      });
    },
  },
};
</script>
<style lang="css" scoped>
.notificationSub {
  font-weight: bold;
}
.date {
  font-size: 0.7em;
  margin-top: 0.85rem;
}
.deleteclassadditionalstyle {
  margin-left: 12px;
}
</style>