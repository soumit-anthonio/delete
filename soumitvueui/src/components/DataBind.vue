<template>
  <div>
    <h1 style="white-space: pre-line">{{ message }}</h1>
    <textarea type="text" v-model="message" />
    <br />
    <button v-on:click="updateTitle">Update Parent Value</button>
  </div>
</template>

<script>
export default {
  name: "DataBind",

  data() {
    return {
      message: "Hi",
    };
  },
  methods: {
    updateTitle() {
      console.warn("Soumit given warning.");
      this.$emit("changeTitle", "Parent Pros Updated");
    },
  },
};
</script>
