<template>
  <div id="app">
    <Navbar></Navbar>
    <!-- nav end -->
    <!-- inventory start -->
    <div class="container mt-6">
      <div class="row">
        <!-- price list start -->
        <div
          v-show="close"
          :class="[loginInfo.name == 'admin' ? 'admin' : 'col-sm-12 col-md-3']"
        >
          <PriceList></PriceList>
        </div>
        <!-- price list end -->
        <!-- items start -->

        <!-- card -->
        <router-view></router-view>
        <!-- <Cards @newItemadded="addCartItem" :items="items"></Cards> -->
        <!-- items end -->
      </div>
    </div>
    <!-- inventory end -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import PriceList from "./components/PriceList";
// import Cards from "./components/Cards";
// import data from "./data.js";

export default {
  components: {
    Navbar,
    PriceList,
    // Cards,
  },
  data() {
    return {
      items: [],
      carts: [],
    };
  },
  computed: {
    close() {
      return this.$store.getters.getcloserpicelist;
    },
    loginInfo() {
      var status = this.$store.getters.getStatus;
      console.log("App.vue Status: ", status);
      return this.$store.getters.getStatus;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.mt-6 {
  margin-top: 4rem;
}
.admin {
  display: none;
}
</style>
