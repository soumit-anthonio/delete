<template>
  <div class=".product-div">
    <h1>This is Soumit Product Component</h1>
    <h2>{{ name }}</h2>
    <h2>{{ bindName }}</h2>
  </div>
</template>

<script>
export default {
  name: "Product Component",
  props: ["name", "bindName"],
  data() {
    return {};
  },
  created: function () {
    console.warn("create fired");
  },
  beforeCreate: function () {
    console.warn("before create fired");
  },
  beforeMount: function () {
    console.warn("before Mount fired");
  },
  mounted: function () {
    console.warn("mount fired");
  },
  beforeUpdate: function () {
    console.warn("before Update fired");
  },
  updated: function () {
    console.warn("updated fired");
  },
  beforeUnmount: function () {
    console.warn("before Unmount fired");
  },
  unmounted: function () {
    console.warn("Unmount fired");
  },
};
</script>

<style lang="css" scoped>
.product-div {
  background-color: #401cc261;
  height: 20px;
}
</style>
