<template>
  <div>This is Soumit</div>
  <div
    class="center mt-5 text-center"
    style="width: 35rem; border-radius: 10px; margin-bottom: 5px"
  >
    <google-chart
      :chartdata="chart_data"
      :chartCreated="chartCreatedFunction($event)"
    />
  </div>
</template>

<script>
import GoogleChart from "../controls/chart/chart.vue";
export default {
  name: "SoumitComponent",
  components: {
    "google-chart": GoogleChart,
  },
  methods: {
    chartCreatedFunction() {
      //console.log(argument);
      // chart create
    },
  },
  data() {
    return {
      chart_data: [
        ["Daily Routine", "Hours per Day"],
        ["Work", 8],
        ["Eat", 2],
        ["Reading", 4],
        ["Exercise", 2],
        ["Sleep", 8],
      ],
    };
  },
};
</script>

<style>
.center {
  margin: auto;
  padding: 10px;
}
</style>