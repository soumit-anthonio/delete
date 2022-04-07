<template>
  <div>
    <button-control
      :text="btnTextSubmit"
      :typeBtn="submitBtnType"
      v-on:btnClicked="btnClickedMeSubmit($event)"
    />
    <h2>Vue Js Google Pie Chart Demo</h2>
    <GChart
      type="PieChart"
      :options="options"
      :data="chartdata"
      :createChart="chartCreate($event)"
    />
  </div>
</template>
<script>
import { GChart } from "vue-google-charts";
import Button from "../buttons/button.vue";
import BtnTypeEnum from "../../assets/js/services/enums/button-type";
export default {
  name: "GoogleChart",
  created() {},
  mounted() {},
  computed: {},
  props: {
     chartdata: {
      type: [Array, Object],
      default: () => []
    },
  },
  components: {
    GChart,
    "button-control": Button,
  },
  methods: {
    btnClickedMeSubmit() {
      //alert("Submit " + argument);
     
    },
    chartCreate() {
      this.$emit("chartCreated", "Chart Created");
    },
  },
  data() {
    return {
      submitBtnType: BtnTypeEnum.Submit,
      btnTextSubmit: "Reload Chart",
      options: {
        width: 500,
        height: 300,
        is3D: true,
        animation: {
          duration: 1000,
          easing: "out",
          startup: true,
        },
      },
    };
  },
};
</script>
<style lang="css" scoped>
</style>
