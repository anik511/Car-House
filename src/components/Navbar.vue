<template>
  <nav class="navbar navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="{ path: '/' }"
      >Car House</router-link
    >
    <form @submit.prevent="search" class="form-inline">
      <input
        v-model="keyword"
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        @input="search"
      />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  </nav>
</template>

<script>
// import axios from "axios";
import data from "../data.js";
export default {
  data() {
    return {
      keyword: "",
    };
  },

  methods: {
    search() {
      // var self = this;
      // axios
      //   .get("http://localhost:3000/search/" + this.keyword)
      //   .then(response => {
      //     self.$store.commit("setCards", response.data);
      //   });
      var items = data.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1
        );
      });
      this.$store.commit("setCards", items);
    },
  },
};
</script>

<style></style>
