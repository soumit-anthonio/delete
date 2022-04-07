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
        <h3>Balance Enquery</h3>
        <i class="fas fa-print print-report" @click="print_Report"></i>
        <h4 v-if="!data_balances">{{ name }}</h4>
        <div v-if="data_balances && mobileView" class="mobile-view">
          <div
            v-for="item in data_balances"
            v-bind:key="item._id"
            class="card"
            style="width: 16rem; border-radius: 1.25rem; margin-bottom: 9px"
          >
            <div class="card-body">
              <h5 class="card-title">Comment</h5>
              <p class="card-text">Rs: {{ item.amount }}/- {{ item.reason }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Tranaction Type <strong>{{ item.transactionmode }}</strong>
              </li>
              <li class="list-group-item">
                On <strong>{{ formatDate(item.date) }}</strong>
              </li>
              <li class="list-group-item">Available Balance</li>
            </ul>
            <div class="card-body">
              <a href="#" class="card-link"></a>
              <a href="#" class="card-link"
                ><strong>Rs: {{ item.totalamount }}/-</strong></a
              >
            </div>
          </div>
        </div>
        <table
          v-if="data_balances && !mobileView"
          class="
            table table-fixed table-hover table-striped table-responsive-stack
          "
        >
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Amount (Credited/Debited)</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
              <th scope="col">Date</th>
              <th scope="col">Comment</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data_balances_sorted" v-bind:key="item._id">
              <td data-title="Name">{{ item.username }}</td>
              <td data-title="Amount (Credited/Debited)">{{ item.amount }}</td>
              <td data-title="Debit">{{ isDebit(item.transactionmode) }}</td>
              <td data-title="Credit">{{ isCredit(item.transactionmode) }}</td>
              <td data-title="Date">{{ formatDate(item.date) }}</td>
              <td data-title="Comment">{{ item.reason }}</td>
              <td data-title="Balance">{{ item.totalamount }}</td>
            </tr>
            <tr>
              <td colspan="7"><hr /></td>
            </tr>
            <tr>
              <td colspan="6"><h3>Total Balance</h3></td>
              <td>{{ data_balances[0].totalamount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../assets/js/services/EventService";
import Navigation from "./awsome/Navigation.vue";
import NavigationMobile from "./awsome/NavigationMobile.vue";
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";

export default {
  name: "BalanceEnquery",
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
  components: { Navigation, NavigationMobile },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  mounted() {
    if (this.store.getters.getCandidateId()) {
      this.candidate_id = this.store.getters.getCandidateId();
      //const apiUrl = config.apiUrl;
      apiClient
        .get("/alienusers/balancestatement/" + this.candidate_id)
        .then((res) => {
          console.warn(res);
          this.data_balances = res.data;
          this.data_balances_sorted = this.data_balances.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        });
    } else {
      this.$swal.fire("You are not authenticated. Please login", "", "error");
      this.name =
        "Your credentials are not valid. You will be redirected to the LOGIN page shortly....";
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    }
  },
  methods: {
    print_Report() {
     
      //const apiUrl = config.apiUrl;
      this.candidate_id = this.store.getters.getCandidateId();
      apiClient.post("/alienmail/send/" + this.candidate_id).then((res) => {
        console.log(res);
        this.$swal
          .fire(
            "An Email has been sent to your registered Email address. Please follow the instruction to open the attachment." ,
            "",
            "success"
          )
          .then(() => {
            this.$router.push("/balancecheck");
          });
        console.log("Email sent........");
      });
    },
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(date)
      );
    },
    isDebit(debit_credit) {
      const transaction_type = debit_credit.toUpperCase();
      if (transaction_type === "DEBIT") {
        return debit_credit;
      } else {
        return "";
      }
    },
    isCredit(debit_credit) {
      const transaction_type = debit_credit.toUpperCase();
      if (transaction_type === "CREDIT") {
        return debit_credit;
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      mobileView: true,
      showNav: false,
      name: "Your Balance will apear soon........",
      candidate_id: null,
      data_balances: null,
      data_balances_sorted: null,
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
table {
  display: block;
  height: 330px;
  overflow-y: scroll;
}
.mobile-view {
  display: block;
  height: 450px;
  overflow-y: scroll;
}
.print-report {
  position: relative;
  top: -33px;
  left: 223px;
}
</style>
