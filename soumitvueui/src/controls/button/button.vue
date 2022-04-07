<template>
  <ng-container :class="childclass">
    <ng-container v-if="isThisPrimaryButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-primary">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisSecondaryButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-secondary">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisSuccessButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-success">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisDangerButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-danger">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisWarningButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-warning">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisInfoButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-info">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisLightButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-light">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisDarkButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-dark">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisLinkButton">
      <button type="button" v-on:click="buttonClicked" class="btn btn-link">
        {{ text }}
      </button>
    </ng-container>
     <ng-container v-if="isThisSubmitButton">
      <button type="submit" v-on:click="buttonClicked" class="btn btn-primary">
        {{ text }}
      </button>
    </ng-container>
    <ng-container v-if="isThisDefaultButton">
      <button v-on:click="buttonClicked" class="default-style">
        {{ text }}
      </button>
    </ng-container>
  </ng-container>
</template>
<script>
import BtnTypeEnum from "../../assets/js/services/enums/button-type";
export default {
  name: "button-control",
  created() {},
  mounted() {},
  computed: {
    isThisPrimaryButton() {
      return this.typeBtn == BtnTypeEnum.Primary ? true : false;
    },
    isThisSecondaryButton() {
      return this.typeBtn == BtnTypeEnum.Secondary ? true : false;
    },
    isThisSuccessButton() {
      return this.typeBtn == BtnTypeEnum.Success ? true : false;
    },
    isThisDangerButton() {
      return this.typeBtn == BtnTypeEnum.Danger ? true : false;
    },
    isThisWarningButton() {
      return this.typeBtn == BtnTypeEnum.Warning ? true : false;
    },
    isThisInfoButton() {
      return this.typeBtn == BtnTypeEnum.Info ? true : false;
    },
    isThisLightButton() {
      return this.typeBtn == BtnTypeEnum.Light ? true : false;
    },
    isThisDarkButton() {
      return this.typeBtn == BtnTypeEnum.Dark ? true : false;
    },
    isThisLinkButton() {
      return this.typeBtn == BtnTypeEnum.Link ? true : false;
    },
    isThisSubmitButton() {
      return this.typeBtn == BtnTypeEnum.Submit ? true : false;
    },
    isThisDefaultButton() {
      return this.typeBtn == BtnTypeEnum.Default ? true : false;
    },
  },
  props: {
    text: String,
    typeBtn: String,
    childclass: String,
  },
  components: {},
  methods: {
    buttonClicked() {
      //console.warn("Child Button Clicked");
      this.$emit("btnClicked", "Clicked");
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="css" scoped>
.default-style {
  width: 120px;
  color: black;
  box-shadow: 1mm;
}
</style>
