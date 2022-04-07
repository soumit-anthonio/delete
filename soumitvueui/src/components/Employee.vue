<template>
  <div v-if="list">
    <h1>Employee List</h1>
    <div>
      <table>
        <tr>
          <td>Name</td>
          <td>Tech</td>
          <td>Sub</td>
        </tr>
        <tr v-for="item in list" v-bind:key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.tech }}</td>
          <td>{{ item.sub }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
//import Vue from "vue";
import apiClient from "../assets/js/services/EventService";

export default {
  name: "Employee",
  data() {
    return {
      list: undefined,
    };
  },
  mounted() {
    //DOM ready
    //const apiUrl = config.apiUrl;
    apiClient
      .get("/aliens", {
        headers: {
          //Authorization: "Bearer" + "Your Bearer Pssword",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.warn(response);
        this.list = response.data;
      });
  },
};
</script>

<style lang="css" scoped>
</style>
