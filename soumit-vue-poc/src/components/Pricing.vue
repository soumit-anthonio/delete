<template>
  <div>This is Pricing</div>
  <br />
  <grid-control
    headerText="Soumit Grid"
    :gridDataSource="gridDataRaw"
    :gridPageSizes="[5, 10, 50, 100, 'all']"
    :gridDisplayMode="gridDisplayMode"
  />
</template>

<script>
import GridControl from "../controls/grid/grid.vue";
import GridDisplayModeEnum from "../assets/js/services/enums/grid-display-mode";
import { generateData } from "../assets/js/services/datasources/data";

export default {
  name: "PricingComponent",
  components: {
    "grid-control": GridControl,
  },
  data() {
    return {
      gridDisplayMode: GridDisplayModeEnum.Compact,
      gridDataRaw: generateData(400),
    };
  },
};
</script>

<style>
</style>