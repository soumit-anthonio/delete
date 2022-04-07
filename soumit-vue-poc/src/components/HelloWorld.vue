<template>
  <div class="hello">
    <h1>Welcome Soumit</h1>
    <button-control
      :text="btnTextSubmit"
      :typeBtn="submitBtnType"
      :childclass="{ submitstyle: true }"
      v-on:btnClicked="btnClickedMeSubmit($event)"
    />
    <button-control
      :text="btnTextCancel"
      :typeBtn="cancelBtnType"
      :childclass="{ cancelclassadditionalstyle: true }"
      v-on:btnClicked="btnClickedMeCancel($event)"
    />
    <button-control
      :text="btnTextDefault"
      :typeBtn="defaultBtnType"
      :childclass="{ defaultclassadditionalstyle: true }"
      v-on:btnClicked="btnClickedMeDefault($event)"
    />

    <br />

    <!-- <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>

    <button type="button" class="btn btn-link">Link</button> -->

    <br />
  </div>
</template>

<script>
import Button from "../controls/buttons/button.vue";
import BtnTypeEnum from "../assets/js/services/enums/button-type";

export default {
  name: "HelloWorld",
  props: {},
  components: {
    "button-control": Button,
  },
  methods: {
    btnClickedMeSubmit(argument) {
      alert("Submit " + argument);
    },
    btnClickedMeCancel(argument) {
      alert("Cancel " + argument);
    },
    btnClickedMeDefault(argument) {
      alert("Default " + argument);
    },
  },
  data() {
    return {
      submitBtnType: BtnTypeEnum.Primary,
      cancelBtnType: BtnTypeEnum.Secondary,
      defaultBtnType: BtnTypeEnum.Default,
      btnTextSubmit: "Hello Soumit",
      btnTextCancel: "Cancel",
      btnTextDefault: "Default",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.submitstyle {
  margin-top: 10rem;
  margin-left: 2rem;
}
.cancelclassadditionalstyle {
  margin-top: 10rem;
  margin-left: 2rem;
}
.defaultclassadditionalstyle {
  margin-left: 2rem;
}
</style>
