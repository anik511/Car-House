<template>
  <div id="app">
    <Navbar></Navbar>
    <!-- nav end -->
    <!-- inventory start -->
    <div class="container">
      <div class="row">
        <!-- price list start -->
        <div v-show="close" class="col-sm-12 col-md-3">
          <PriceList></PriceList>
        </div>
        <!-- price list end -->
        <!-- items start -->
        <div class="col-sm-12 col-md-9">
          <!-- card -->
          <router-view></router-view>
          <!-- <Cards @newItemadded="addCartItem" :items="items"></Cards> -->
        </div>
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
  },
  mounted() {},
  methods: {},
};
</script>

<style></style>
