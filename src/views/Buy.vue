<template>
  <div id="mr-buy" class="col-sm-12 col-md-12">
    <div class="row">
      <ul class="list-group">
        <li class="list-group-item">
          <span class="item-name">Item</span>
          <span class="item-price float-right">Price</span>
        </li>
        <li class="list-group-item" v-for="(cart, index) in carts" :key="index">
          <button
            @click="removeCart(index), reStore(cart.id)"
            class="btn btn-xs btn-danger"
          >
            Remove
          </button>
          <span class="item-name"> {{ cart.title }}-{{ cart.model }}</span>
          <img :src="cart.photo" class="buy-img" alt="..." />
          <span class="buy-price">${{ cart.price }}</span>
        </li>
        <li class="list-group-item" style="border: solid rgb(241, 113, 7) 1px">
          <span class="item-name">Total</span>
          <span class="item-price float-right">${{ total }}</span>
        </li>
        <li v-if="carts.length > 0" class="List-group-item">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-block btn-success"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Buy
          </button>
        </li>
      </ul>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-body">
              Are you sure you want to Buy??
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                @click="soldItem()"
                class="btn btn-success"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    carts() {
      var status = this.$store.getters.getStatus;
      console.log(status.stat);
      if (status.stat !== true) {
        this.$router.push({ path: "/" });
      }
      var carts = this.$store.getters.getCart;
      if (carts.length != 0) {
        return carts;
      } else {
        this.$router.push({ path: "/" });
      }
    },
    total() {
      var total = 0;
      this.carts.forEach((cart) => {
        total += parseFloat(cart.price);
      });
      return total.toFixed(2);
    },
    // loginInfo() {
    //   var status = this.$store.getters.getStatus;
    //   console.log("PriceList Status: ", status);
    //   return this.$store.getters.getStatus;
    // },
  },
  methods: {
    removeCart(index) {
      this.$store.commit("removeItem", index);
    },
    soldItem() {
      this.$store.dispatch("soldCars", this.carts);
      this.buyCar();
    },
    buyCar() {
      console.log("Clear");
      this.$store.commit("clearList");
      this.$router.push({ path: "/" });
    },
    reStore(id) {
      console.log("restore", id);
      this.$store.dispatch("restoreStock", id);
    },
  },
};
</script>
<style>
#mr-buy {
  margin: 0 auto;
}
.buy-img {
  /* border: 1px solid salmon; */
  height: 100%;
  width: 35%;
  margin: 0 10px;
}
.modal-body {
  text-align: center;
  color: #fff;
}
.list-group {
  margin: 10px auto !important;
}
.buy-price {
  margin-left: 30px;
}
.modal-content {
  background: #343a40 !important;
}
.modal-footer {
  border-top: 0px !important;
}
.modal-footer button {
  margin: 0 auto !important;
}
</style>
