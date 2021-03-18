<template>
  <div class="col-sm-12 col-md-12">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-2">
          user login
          <hr />
          <br />username:user<br />pass: user
          <hr />
          admin login
          <hr />
          <br />username: admin<br />pass: admin<br />
        </div>
        <div class="col-lg-6 col-md-8 login-box">
          <div class="col-lg-12 login-title">
            Car House<br />
            <span class="create-account"
              >New here?<router-link tag="a" to="/register"
                >Create Account</router-link
              ></span
            >
          </div>

          <div class="col-lg-12 login-form">
            <div class="col-lg-12 login-form">
              <form @submit.prevent="logIn">
                <div class="form-group">
                  <label class="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    v-model="username"
                    :class="['form-control', { error: name_error }]"
                    @input="wrongMsg"
                    required
                  />
                  <small v-show="name_error" class="errormsg"
                    >Wrong username!!</small
                  >
                </div>
                <div class="form-group">
                  <label class="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    :class="['form-control', { error: password_error }]"
                    v-model="password"
                    @input="wrongMsg"
                    required
                  />
                  <small v-show="password_error" class="errormsg"
                    >Wrong password!!</small
                  >
                </div>
                <div class="col-lg-12 loginbttm">
                  <div class="col-lg-6 login-btm login-button">
                    <button type="submit" class="btn btn-outline-success">
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      admins: [
        {
          id: 1,
          email: "admin@gmail.com",
          name: "admin",
          password: "admin",
        },
        {
          id: 2,
          email: "admin2@gmail.com",
          name: "admin2",
          password: "admin2",
        },
        {
          id: 3,
          email: "admin3@gmail.com",
          name: "admin3",
          password: "admin3",
        },
      ],
      users: [
        {
          id: 1,
          email: "user@gmail.com",
          name: "user",
          password: "user",
        },
        {
          id: 2,
          email: "user2@gmail.com",
          name: "user2",
          password: "user2",
        },
        {
          user_id: 3,
          user_email: "user3@gmail.com",
          user_name: "user3",
          user_password: "user3",
        },
      ],
      info: { name: null, stat: false },
      name_error: false,
      password_error: false,
      prevRoute: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  computed: {
    allAdmins() {
      return this.$store.getters.getAdmins;
    },
    allUsers() {
      console.log("auidausdug ", this.$store.getters.getUsers);
      return this.$store.getters.getUsers;
    },
    findUserName() {
      if (this.allUsers.find((user) => user.name == this.username)) {
        return true;
      } else return false;
    },
    findUserpass() {
      if (this.allUsers.find((user) => user.password == this.password)) {
        return true;
      } else return false;
    },
    findAdminName() {
      if (this.allAdmins.find((admin) => admin.name == this.username)) {
        return true;
      } else return false;
    },
    findAdminpass() {
      if (this.allAdmins.find((admin) => admin.password == this.password)) {
        return true;
      } else return false;
    },
  },
  mounted() {
    this.priceCart();
  },
  methods: {
    priceCart() {
      this.$store.dispatch("closeCart", false);
      if (this.allUsers.length == 3) {
        this.$store.dispatch("setUsers", this.users);
        this.$store.dispatch("setAdmins", this.admins);
      }
    },
    logIn() {
      if (this.username != null && this.password != null) {
        if (this.findUserName && this.findUserpass) {
          this.info.name = "user";
          this.info.stat = true;
          this.$store.dispatch("setStatus", this.info);
          this.reSet();
          console.log("Path: ", this.prevRoute.path);
          this.$router.push({ path: this.prevRoute.path });
        } else if (this.findAdminName && this.findAdminpass) {
          this.info.name = "admin";
          this.info.stat = true;
          this.$store.dispatch("setStatus", this.info);
          this.reSet();
          this.$router.push({ path: "/" });
        } else {
          if (!this.findAdminName && !this.findUserName) {
            this.name_error = true;
            this.username = null;
          }
          if (!this.findAdminpass || !this.findUserpass) {
            this.password_error = true;
            this.password = null;
          }

          console.log("Hey wha happen!!");
        }
      } else {
        console.log("Unknown exception");
      }
    },
    wrongMsg() {
      if (this.username != null) {
        this.name_error = false;
      }
      if (this.password != null) {
        this.password_error = false;
      }
    },
    reSet() {
      this.username = null;
      this.password = null;
    },
  },
};
</script>

<style scoped>
@import "../assets/login.css";
.error {
  border-bottom: 1px solid red !important;
}
.errormsg {
  color: red;
}
</style>
