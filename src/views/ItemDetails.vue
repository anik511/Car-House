<template>
  <div v-if="item" class="row">
    <div class="col-sm-6">
      <img class="des-img" :src="item.photo" alt="Photo" />
      <img
        v-show="item.stock == 0 && item.sold == true"
        src="../assets/sold_out.png"
        class="sold-out"
        alt="..."
      />
    </div>
    <div class="col-sm-6">
      <h3>{{ item.model }} - {{ item.year }}</h3>
      <h5>{{ item.title }}</h5>
      <span class="green" v-if="item.stock > 0"
        >&nbsp;&nbsp;&nbsp;&nbsp; Stock: {{ item.stock }}</span
      >
      <span class="red" v-else>&nbsp;&nbsp;&nbsp;&nbsp; Out of stock</span>
      <p>{{ item.description }}</p>

      <p class="price">${{ item.price }}</p>
      <a
        href="#"
        v-if="item.stock > 0"
        @click="addToCart(item), reduceStock(item.id)"
        class="btn btn-primary addbtn"
        >Add +</a
      >
    </div>
  </div>
  <h3 v-else>Loading...</h3>
</template>
<script>
// import axios from "axios";
// import data from "../data.js";
export default {
  data() {
    return {
      item: null,
    };
  },
  computed: {
    data() {
      return this.$store.getters.getInvetory;
    },
  },
  mounted() {
    this.fetchItem();
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch("addToCart", item);
    },
    reduceStock(id) {
      console.log(id);
      this.$store.dispatch("currentStock", id);
    },
    fetchItem() {
      this.$store.dispatch("closeCart", true);
      // var self = this;
      // axios
      //   .get("http://localhost:3000/item/" + self.$route.params.id)
      //   .then((response) => {
      //     self.item = response.data;
      //     self.loading = false;
      //   });
      this.item = this.data.find((item) => item.id == this.$route.params.id);
      this.item.description =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised i";
    },
  },
};
</script>
<style>
.addbtn {
  width: 50%;
  float: left;
}
.price {
  width: 50%;
  float: left;
  margin-top: 9px;
}
.des-img {
  width: 100%;
  margin-top: 65px;
}
.sold-out {
  cursor: pointer;
  height: 10rem;
  position: initial;
  margin: -160px 0px 0px 12px;
}
</style>
