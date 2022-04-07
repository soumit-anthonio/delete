<template>
  <datepicker
    v-model="propertyDatePicker.picked"
    :upperLimit="propertyDatePicker.to"
    :lowerLimit="propertyDatePicker.from"
    :clearable="false"
  />
</template>


<script>
import Datepicker from "vue3-datepicker";

export default {
  name: "DatePicker",
  props: ["datepickerProp"],
  components: {
    datepicker: Datepicker,
  },
  data() {
    return {
      propertyDatePicker: this.datepickerProp,
    };
  },
};
</script>
<style lang="css" scoped>
.v3dp__popout {
  width: 14.5em !important;
}
</style>