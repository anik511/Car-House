<template>
  <div class="row">
    <ul class="list-group">
      <li class="list-group-item">
        <span class="item-name">Item</span>
        <span class="item-price float-right">Price</span>
      </li>
      <li class="list-group-item" v-for="(cart, index) in carts" :key="index">
        <button
          @click="removeCart(index), reStore(cart.id)"
          class="btn btn-danger btn-sm"
        >
          X
        </button>
        <span class="item-name"> {{ cart.title }}-{{ cart.model }}</span>
        <span class="item-price float-right">${{ cart.price }}</span>
      </li>
      <li class="list-group-item" style="border: solid rgb(241, 113, 7) 1px">
        <span class="item-name">Total</span>
        <span class="item-price float-right">${{ total }}</span>
      </li>
      <li v-if="carts.length > 0" class="List-group-item">
        <button @click="checkOut" class="btn btn-block btn-success">
          Checkout
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    carts() {
      return this.$store.getters.getCart;
    },
    total() {
      var total = 0;
      this.carts.forEach((cart) => {
        total += parseFloat(cart.price);
      });
      return total.toFixed(2);
    },
    loginInfo() {
      var status = this.$store.getters.getStatus;
      console.log("PriceList Status: ", status);
      return this.$store.getters.getStatus;
    },
  },
  methods: {
    removeCart(index) {
      this.$store.commit("removeItem", index);
    },
    checkOut() {
      if (this.loginInfo.name == "user" && this.loginInfo.stat) {
        this.$store.dispatch("closeCart", false);
        this.$router.push({ path: "/buy" });
      } else {
        this.$router.push({ path: "/login" });
      }

      // if(confirm("Are you sure you want to Checkout??")){
      //   this.$store.commit('clearList')
      // }
    },
    reStore(id) {
      console.log("restore", id);
      this.$store.dispatch("restoreStock", id);
    },
  },
};
</script>

<style>
.list-group {
  width: 100%;
  padding: 0 10px !important;
  border-color: #28a345;
}
.list-group li:first-child {
  background-color: #343a40;
}
.list-group li span {
  color: #28a345;
}
.item-name {
  width: 70%;
}
.item-price {
  width: 30%;
  text-align: right;
}
.List-group-item {
  list-style-type: none;
}
</style>
<style scoped></style>
