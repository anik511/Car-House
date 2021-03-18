<template>
  <div
    :class="[
      loginInfo.name == 'admin'
        ? 'col-sm-12 col-md-12 col-lg-12'
        : 'col-sm-12 col-md-9 col-lg-9',
    ]"
  >
    <div v-if="loading" class="row">
      <!-- card start -->
      <div
        v-for="(item, index) in items"
        :key="index"
        class="card col-12 col-sm-4 col-md-4 col-lg-3"
      >
        <router-link tag="div" :to="{ path: '/item/' + item.id }">
          <img :src="item.photo" class="card-img-top image-pointer" alt="..." />
          <img
            v-show="item.stock == 0 && item.sold == true"
            src="../assets/sold_out.png"
            class="sold-out"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.model }} - {{ item.year }}</h5>
            <p class="card-text">
              {{ item.title }}
              <span class="green" v-if="item.stock > 0"
                >&nbsp;&nbsp;&nbsp;&nbsp; Stock: {{ item.stock }}</span
              >
              <span class="red" v-else
                >&nbsp;&nbsp;&nbsp;&nbsp; Out of stock</span
              >
            </p>
          </div>
        </router-link>
        <div class="card-footer">
          <p class="pricing">${{ item.price }}</p>
          <a
            v-if="item.stock > 0"
            @click="addToCart(item), reduceStock(item.id)"
            class="btn btn-outline-dark addbtn"
            >Add +</a
          >
        </div>
      </div>
    </div>

    <!-- card end -->
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
// import axios from "axios";
// import data from "../data.js";
export default {
  data() {
    return {
      loading: true,
      data: [
        {
          id: 1,
          stock: 3,
          sold: false,
          model: "Corolla",
          year: 1994,
          title: "Toyota",
          photo:
            "https://img2.pngio.com/2000-toyota-corolla-photos-specs-news-radka-cars-blog-1995-toyota-corolla-png-500_296.png",
          price: 2.26,
        },
        {
          id: 2,
          stock: 3,
          sold: false,
          model: "Protege",
          year: 2003,
          title: "Mazda",
          photo:
            "https://cdn.shopify.com/s/files/1/0686/7599/files/Protoge_600x315_large.png?v=1491424500",
          price: 7.01,
        },
        {
          id: 3,
          stock: 3,
          sold: false,
          model: "S4",
          year: 2013,
          title: "Audi",
          photo:
            "https://caractere.pro/image/data/Modele/audi-a4-2008-caractere.png",
          price: 8.83,
        },
        {
          id: 4,
          stock: 3,
          sold: false,
          model: "Sierra 2500",
          year: 2010,
          title: "GMC",
          photo:
            "https://cdn.carbuzz.com/car-thumbnails/original/8000/800/8891.jpg",
          price: 3.89,
        },
        {
          id: 5,
          stock: 3,
          sold: false,
          model: "500",
          year: 2012,
          title: "Fiat",
          photo:
            "https://lifebysaje.files.wordpress.com/2011/03/fiat-500-by-gucci-black.jpg",
          price: 6.15,
        },
        {
          id: 6,
          stock: 3,
          sold: false,
          model: "Integra",
          year: 1994,
          title: "Acura",
          photo:
            "https://mk0autoinstruct25ass.kinstacdn.com/wp-content/uploads/2015/08/honda-integra-01.png",
          price: 6.27,
        },
        {
          id: 7,
          stock: 3,
          sold: false,
          model: "Grand Caravan",
          year: 1994,
          title: "Dodge",
          photo:
            "https://images.hgmsites.net/lrg/2011-dodge-grand-caravan-4-door-wagon-express-angular-front-exterior-view_100345856_l.jpg",
          price: 6.06,
        },
        {
          id: 8,
          stock: 3,
          sold: false,
          model: "M3",
          year: 1995,
          title: "BMW",
          photo:
            "https://freepikpsd.com/wp-content/uploads/2020/04/bmw-m3-png-Transparent-Images-Free-Download-.png",
          price: 4.04,
        },
        {
          id: 9,
          stock: 3,
          sold: false,
          model: "6000",
          year: 1989,
          title: "Pontiac",
          photo:
            "https://www.pngkey.com/png/detail/251-2516724_car-png-hd-car-png-hd-png-car.png",
          price: 2.62,
        },
        {
          id: 10,
          stock: 3,
          sold: false,
          model: "7 Series",
          year: 2004,
          title: "BMW",
          photo:
            "https://cdn.jdpower.com/ChromeImageGallery/Expanded/White/640/2010BMW005a_640/2010BMW005a_640_01.jpg",
          price: 0.85,
        },
        {
          id: 11,
          stock: 3,
          sold: false,
          model: "4Runner",
          year: 2008,
          title: "Toyota",
          photo: "https://autos.hamariweb.com/images/carimages/AAerIwh.jpg",
          price: 9.9,
        },
        {
          id: 12,
          stock: 3,
          sold: false,
          model: "S40",
          year: 2001,
          title: "Volvo",
          photo: "https://vistapointe.net/images/volvo-s40-9.jpg",
          price: 1.67,
        },
        {
          id: 13,
          stock: 3,
          sold: false,
          model: "F350",
          year: 2004,
          title: "Ford",
          photo:
            "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_low/v1/editorial/vhs/Ford-Superduty-F-350.png",
          price: 6.94,
        },
        {
          id: 14,
          stock: 3,
          sold: false,
          model: "6 Series",
          year: 2008,
          title: "BMW",
          photo:
            "https://www.motortrend.com/uploads/sites/10/2015/11/2008-bmw-6-series-650i-coupe-angular-front.png?fit=around%7C875:492.1875",
          price: 6.52,
        },
        {
          id: 15,
          stock: 3,
          sold: false,
          model: "Voyager",
          year: 2003,
          title: "Chrysler",
          photo:
            "https://s.aolcdn.com/commerce/autodata/images/USB30CDV011B0101.jpg",
          price: 7.27,
        },
        {
          id: 16,
          stock: 3,
          sold: false,
          model: "Fortwo",
          year: 2009,
          title: "Smart",
          photo:
            "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/model-years/9604-2019-smart-fortwo",
          price: 9.07,
        },
        {
          id: 17,
          stock: 3,
          sold: false,
          model: "Maxima",
          year: 1995,
          title: "Nissan",
          photo:
            "https://di-uploads-pod25.dealerinspire.com/johnamatonissan/uploads/2019/12/SR.png",
          price: 8.11,
        },
        {
          id: 18,
          stock: 3,
          sold: false,
          model: "911",
          year: 2001,
          title: "Porsche",
          photo:
            "https://www.motortrend.com/uploads/sites/10/2017/11/2017-porsche-911-carrera-coupe-angular-front.png",
          price: 5.69,
        },
        {
          id: 19,
          stock: 3,
          sold: false,
          model: "Mazda 2",
          year: 2012,
          title: "Mazda",
          photo:
            "https://images.hgmsites.net/hug/2011-mazda-mazda2-4-door-hb-auto-sport-angular-front-exterior-view_100322390_h.jpg",
          price: 1.22,
        },
        {
          id: 20,
          stock: 3,
          sold: false,
          model: "V50",
          year: 2007,
          title: "Volvo",
          photo:
            "https://www.motortrend.com/uploads/sites/10/2015/11/2010-volvo-v50-2.4-i-wagon-angular-front.png",
          price: 2.13,
        },
        {
          id: 21,
          stock: 3,
          sold: false,
          model: "F350",
          year: 2004,
          title: "Ford",
          photo:
            "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_low/v1/editorial/vhs/Ford-Superduty-F-350.png",
          price: 6.94,
        },
      ],
    };
  },
  mounted() {
    this.fetchInventory();
  },
  computed: {
    items() {
      return this.$store.getters.getInvetory;
    },
    loginInfo() {
      var status = this.$store.getters.getStatus;
      console.log("Card Status: ", status);
      return this.$store.getters.getStatus;
    },
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch("addToCart", item);
    },
    reduceStock(id) {
      console.log(id);
      this.$store.dispatch("currentStock", id);
    },
    fetchInventory() {
      this.$store.dispatch("closeCart", true);
      var self = this;
      if (this.items.length == 0) {
        console.log(self.data);

        // axios.get("http://localhost:3000/items").then(response => {
        //   // setTimeout(function () {

        //   // }, 1000);
        //   // self.items = response.data;
        //   self.$store.commit("setCards", response.data), (self.loading = false);
        // });
        self.$store.commit("setCards", self.data);
      }
    },
  },
};
</script>

<style>
.addbtn {
  width: 50%;
  float: left;
}
.pricing {
  width: 50%;
  float: left;
}
.card-img-top {
  height: 9rem;
}
.sold-out {
  cursor: pointer;
  height: 10rem;
  position: initial;
  margin: -160px 0px 0px 12px;
}
.image-pointer,
.card-body {
  cursor: pointer;
}
.card-body {
  height: 124px !important;
}
.card {
  padding: 0px !important;
  float: left;
  margin: 10px 0px 10px 0px;
}
.green {
  color: green;
}
.red {
  color: red;
  text-decoration-line: line-through;
}
</style>
