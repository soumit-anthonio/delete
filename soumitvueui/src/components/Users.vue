<template>
  <div class=".user-div">
    <h1>This is Soumit User Component</h1>
    <h3 v-bind:style="{ color: 'red' }">{{ name }}</h3>
    <h3 v-bind:class="{ display: true }">{{ a + b }}</h3>
    <p v-html="rowHTML"></p>
    <h3>{{ ok ? "Yes" : "No" }}</h3>
    <button v-bind:disabled="disableBtn" v-on:click="updateText">
      Click ME?
    </button>
  </div>
</template>

<script>
export default {
  name: "User Component",
  data() {
    return {
      name: "Soumit",
      a: 10,
      b: 20,
      rowHTML: "<h2>My Name is Soumit</h2>",
      ok: true,
      disableBtn: true,
    };
  },
  methods: {
    updateText() {
      this.ok = !this.ok;
    },
  },
};
</script>

<style lang="css" scoped>
.user-div {
  background-color: #c0d21e61;
  height: 20px;
}
.display {
  background-color: brown;
}
</style>
