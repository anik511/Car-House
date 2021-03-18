<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link tag="a" class="navbar-brand" :to="{ path: '/' }"
        >Car House</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="keyword"
            @input="search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ path: '/' }"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li v-if="loginInfo.stat" class="nav-item">
            <a class="nav-link" href="#" @click="logOut">Logout</a>
          </li>
          <li v-else class="nav-item">
            <router-link tag="a" class="nav-link" :to="{ path: '/login' }"
              >Login</router-link
            >
          </li>

          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Disabled</a
            >
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// import axios from "axios";
import data from "../data.js";
export default {
  data() {
    return {
      keyword: "",
      info: { name: null, stat: false },
    };
  },
  computed: {
    loginInfo() {
      var status = this.$store.getters.getStatus;
      console.log("nav Status: ", status);
      return this.$store.getters.getStatus;
    },
  },
  // mounted() {
  //   this.setStatus();
  // },
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
    logOut() {
      if (this.loginInfo.name == "admin" && this.loginInfo.stat) {
        console.log("Admin Logout");
        localStorage.removeItem("adminLogin");
        this.$store.dispatch("setStatus", false);
      } else if (this.loginInfo.name == "user" && this.loginInfo.stat) {
        console.log("User Logout");
        localStorage.removeItem("userLogin");
        this.$store.dispatch("setStatus", false);
      }
    },
    // setStatus() {
    //   this.status = this.loginInfo;
    // },
  },
};
</script>

<style scoped></style>
