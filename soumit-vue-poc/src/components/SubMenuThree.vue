<template>
  <br />
  <div class="container-fluid">
    <div class="card">
      <h5 class="card-header">Sub Menu Three</h5>
      <div class="card-body">
        <p class="card-text">
          <render-control />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import renderControl from "../controls/rendercontrol/rendercontrol.vue";
export default {
  name: "SubMenuThree",
  components: {
    "render-control": renderControl,
  },
};
</script>

<style>
</style>