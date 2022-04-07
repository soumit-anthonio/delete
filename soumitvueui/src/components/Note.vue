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
        <div v-if="!showAddNote" class="notes mobile-view">
          <span v-on:click="toggleAddNote()">Add Note?</span>
          <input
            type="text"
            v-model="textComputed"
            placeholder="Defer Search Note"
          />
          <NoteItem
            v-for="(user_note, i) in user_notes_sorted"
            :note="user_note"
            :index="i"
            :key="i"
            :open="user_note.open"
          />
        </div>
        <div v-if="showAddNote" class="addNote">
          <span v-on:click="toggleAddNote()">View Notes</span>
          <table>
            <tr>
              <td>
                <h3>{{ ucaseName }}</h3>
                <div>
                  <form>
                    <textarea
                      v-model="transactionForm.note"
                      name="note"
                      placeholder="enter note"
                      style="width: 262px; height: 330px"
                    ></textarea>
                    <br />
                    <input
                      type="checkbox"
                      name="confidential"
                      v-model="transactionForm.isconfidential"
                    />
                    <br />
                    <button-control
                      :text="btnTextSubmit"
                      :typeBtn="defaultBtnType"
                      v-on:btnClicked="alertDisplay($event)"
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
import NoteItem from "./NoteItem.vue";
import Button from "../controls/button/button.vue";
import BtnTypeEnum from "../assets/js/services/enums/button-type";

export default {
  name: "Note",
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
      //this.showAddNote = false;
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
    NoteItem,
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
      apiClient
        .get("/alienusers/transactionnote/" + this.candidate_id)
        .then((res) => {
          console.warn(res.data);
          _.forEach(res.data, function (item) {
            item["open"] = false;
          });
          this.user_notes = res.data;
          this.user_notes_sorted = this.user_notes.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          console.warn(this.user_notes_sorted);
        });
    } else {
      this.$swal.fire("You are not authenticated. Please login", "", "error");

      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    }
  },
  methods: {
    toggleAddNote: function () {
      this.showAddNote = !this.showAddNote;
    },
    apiSearchNoteCall(text) {
      console.warn(text);
      var urlString = "";
      if (text != "") {
        urlString =
          "/alienusers/transactionnote/search/" +
          this.candidate_id +
          "/" +
          text;
      } else {
        urlString = "/alienusers/transactionnote/" + this.candidate_id;
      }
      apiClient.get(urlString).then((res) => {
        console.warn(res.data);
        _.forEach(res.data, function (item) {
          item["open"] = false;
        });
        this.user_notes = res.data;
        this.user_notes_sorted = this.user_notes.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        console.warn(this.user_notes_sorted);
      });
    },
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    alertDisplay() {
      if (this.username) {
        return new this.$swal({
          title: "<i>Notes Warning</i>",
          // add a custom html tags by defining a html method.
          html: "Are you sure you want to add this notes ",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.transactionForm.username = this.username;
            console.warn(this.transactionForm);
            apiClient
              .post(
                "/alienusers/transactionnote/" + this.candidate_id,
                this.transactionForm
              )
              .then((res) => {
                console.warn(res);
                this.$swal.fire("Notes Succesfully Added! ", "", "success");
                this.$router.push("/");
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
      noteSearch: "",
      showAddNote: false,
      textForLocUser: "",
      transactionForm: {
        username: null,
        note: null,
        isconfidential: false,
        date: null,
      },
      mobileView: true,
      showNav: false,
      name: "transaction",
      candidate_id: null,
      user_notes: null,
      user_notes_sorted: null,
      defaultBtnType: BtnTypeEnum.Submit,
      btnTextSubmit: "Execute",
    };
  },
  computed: {
    ucaseName() {
      return this.name.toUpperCase();
    },
    textComputed: {
      get() {
        return this.noteSearch;
      },
      set: _.debounce(function (newValue) {
        this.noteSearch = newValue;
        this.apiSearchNoteCall(this.noteSearch);
      }, 50),
    },
  },
};
</script>

<style lang="css" scoped>
.note {
  display: block;
  width: 100%;
  max-width: 768px;
  margin: 15px auto;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.note .noteText {
  position: relative;
  color: #3c3c3c;
  font-size: 20px;
  transition: all 0.4s linear;
}
.note .noteText::after {
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
.note.open .noteText {
  margin-bottom: 15px;
}
.note.open .noteText::after {
  transform: translateY(-50%) rotate(90deg);
}
.note .date {
  color: #3c3c3c;
  font-size: 18px;
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  transition: all 0.4s ease-out;
}
.note.open .date {
  opacity: 1;
  max-height: 1000px;
}
.mobile-view {
  display: block;
  height: 435px;
  overflow-y: scroll;
}
</style>
