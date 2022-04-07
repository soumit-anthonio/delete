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
        <h3>User Details</h3>
        <div v-if="users_list_modified && mobileView" class="mobile-view">
          <div
            v-for="(item, index) in users_list_modified"
            v-bind:key="item._id"
            class="card"
            style="width: 18rem; border-radius: 1.25rem; margin-bottom: 9px"
          >
            <div class="card-body">
              <h5 class="card-title">User Name</h5>
              <p class="card-text">{{ item.username }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                First Name <strong>{{ item.fname }}</strong>
              </li>
              <li class="list-group-item">
                Middle Name <strong>{{ item.mname }}</strong>
              </li>
              <li class="list-group-item">
                Last Name <strong>{{ item.lname }}</strong>
              </li>
              <li class="list-group-item">
                Gender <strong>{{ item.gender }}</strong>
              </li>
              <li class="list-group-item">
                Active <strong>{{ item.active }}</strong>
              </li>
              <li class="list-group-item">
                Description <strong>{{ item.description }}</strong>
              </li>
              <li v-if="!item.IsAdmin" class="list-group-item">Delete</li>
            </ul>
            <div class="card-body">
              <a href="#" class="card-link"></a>
              <a href="#" class="card-link">
                <button
                  v-if="!item.IsAdmin"
                  v-on:click="removeUser(item._id, index)"
                  class="btn"
                >
                  <i class="fa fa-trash"></i></button
              ></a>
            </div>
          </div>
        </div>
        <table
          v-if="users_list_modified && !mobileView"
          class="
            table table-fixed table-hover table-striped table-responsive-stack
          "
        >
          <thead class="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">First Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Active</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in users_list_modified"
              v-bind:key="item._id"
            >
              <td data-title="User Name">{{ item.username }}</td>
              <td data-title="First Name">{{ item.fname }}</td>
              <td data-title="Middle Name">{{ item.mname }}</td>
              <td data-title="Last Name">{{ item.lname }}</td>
              <td data-title="Gender">{{ item.gender }}</td>
              <td data-title="Active">{{ item.active }}</td>
              <td data-title="Description">{{ item.description }}</td>
              <td v-if="!item.IsAdmin" data-title="Delete">
                <button v-on:click="removeUser(item._id, index)" class="btn">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
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
import { inject, onMounted } from "vue";
import { intermittenServiceAPI } from "../compositionAPI/intermittenServiceAPI";

export default {
  name: "User Details",
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
      const reqUser = apiClient.get("/alienusers");
      const reqUserRoles = apiClient.get("/alienuserrole");
      const reqRoles = apiClient.get("/alienroles");

      axios.all([reqUser, reqUserRoles, reqRoles]).then(
        axios.spread((...responses) => {
          const responseUser = responses[0].data;
          const responseUserRoles = responses[1].data;
          const responesRoles = responses[2].data;

          this.users_list = responseUser;
          this.users_list_modified = _.filter(this.users_list, (item) => {
            return item._id !== this.candidate_id;
          });

          _.forEach(this.users_list_modified, function (user) {
            const id = user._id;
            if (responseUserRoles) {
              const userRoleFilter = _.find(responseUserRoles, (userRole) => {
                return userRole.userid == id;
              });

              if (userRoleFilter) {
                if (responesRoles) {
                  const role = _.find(responesRoles, (role) => {
                    return role._id == userRoleFilter.roleid;
                  });
                  user.IsAdmin = role && role.rolename == "Admin";
                }
              }
            }
          });
          console.warn(this.users_list_modified);
        })
      );
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
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    removeUser(id, index) {
      return new this.$swal({
        title: "<i>User Delete Warning</i>",
        // add a custom html tags by defining a html method.
        html: "Are you sure you want to delete this User? ",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          apiClient.delete("/alienusers/" + id).then((res) => {
            console.warn(res);
            this.userDelete = res.data;
            this.users_list_modified.splice(index, 1);
            this.$swal.fire(
              `The user ${this.userDelete.username} has been deleted`,
              "",
              "success"
            );
          });
        }
      });
    },
  },
  data() {
    return {
      mobileView: true,
      showNav: false,
      candidate_id: null,
      userDelete: null,
      users_list_modified: null,
    };
  },
  computed: {
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
</style>
