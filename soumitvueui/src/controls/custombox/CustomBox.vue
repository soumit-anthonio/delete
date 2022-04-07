<template>
  <input
    v-bind:id="fieldId"
    v-bind:class="cssClass"
    v-bind:placeholder="placeHolder"
    v-bind:type="boxType"
    v-bind:value="value"
    v-on:input="updateValue($event.target.value)"
  />
</template>

<script>
export default {
  name: "CustomBox",
  props: {
    fieldId: {
      type: String,
      required: false,
    },
    cssClass: {
      type: String,
      default: "input-field",
    },
    placeHolder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    boxType: {
      type: String,
      default: "text",
    },
  },
  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.input-field{
    font-weight: normal;
}
</style>