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
        <table>
          <tr>
            <td>
              <h3>{{ ucaseName }}</h3>
              <div>
                <form @submit="alertDisplay" method="post">
                  <input
                    type="number"
                    v-model="transactionForm.amount"
                    name="amount"
                    placeholder="enter amount"
                  />
                  <br /><br />
                  <vue-soumit-dropdown
                    :text="text_headline_for_transaction_type"
                    :items="transaction_details"
                    v-on:onSelectedClickEvent="onItemSelectedClickEvent($event)"
                  />
                  <br /><br />
                  <textarea
                    v-model="transactionForm.reason"
                    name="reason"
                    placeholder="enter reason"
                    style="width: 290px"
                  ></textarea>
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
</template>

<script>
import apiClient from "../assets/js/services/EventService";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import VueSoumitDropdown from "vue-soumit-dropdown";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";
import Button from "../controls/button/button.vue";
import BtnTypeEnum from "../assets/js/services/enums/button-type";

export default {
  name: "Register",
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
    VueSoumitDropdown,
    "button-control": Button,
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  mounted() {
    if (this.store.getters.getCandidateId()) {
      this.candidate_id = this.store.getters.getCandidateId();
      this.username = this.store.getters.getUserName();
    } else {
      this.$swal.fire("You are not authenticated. Please login", "", "error");

      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    }
  },
  methods: {
    onItemSelectedClickEvent(event) {
      console.log(event);
      this.transactionForm.transactionmode = event;
    },
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    alertDisplay(e) {
      e.preventDefault();
      if (this.username) {
        return new this.$swal({
          title: "<i>Transaction Warning</i>",
          // add a custom html tags by defining a html method.
          html: "Are you sure you want to add this transaction ",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            e.preventDefault();
            this.transactionForm.username = this.username;
            console.warn(this.transactionForm);
            e.preventDefault();
            apiClient
              .post(
                "/alienusers/transaction/" + this.candidate_id,
                this.transactionForm
              )
              .then((res) => {
                console.warn(res);
                apiClient
                  .get("/alienusers/balanceenquery/" + this.candidate_id)
                  .then((res) => {
                    console.warn(res);
                    this.data_balances = res.data;
                    this.transactionForm = {
                      username: null,
                      amount: null,
                      transactionmode: null,
                      reason: null,
                    };
                    this.$swal
                      .fire(
                        "Transaction Succesfully Updated! " +
                          this.data_balances,
                        "",
                        "success"
                      )
                      .then(() => {
                        this.$router.push("/balancecheck");
                      });
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
      textForLocUser: "",
      text_headline_for_transaction_type: "Select Transaction",
      transaction_details: ["Debit", "Credit"],
      transactionForm: {
        username: null,
        amount: null,
        transactionmode: null,
        reason: null,
      },
      mobileView: true,
      showNav: false,
      name: "transaction",
      candidate_id: null,
      data_balances: null,
      defaultBtnType: BtnTypeEnum.Submit,
      btnTextSubmit: "Execute",
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
</style>
