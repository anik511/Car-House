<template>
  <div class="col-sm-12 col-md-12">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-2"></div>
        <div class="col-lg-6 col-md-8 login-box">
          <div class="col-lg-12 login-title">
            Car House <br />
            <span class="create-account"
              >Have an Account?<router-link tag="a" to="/login"
                >Login</router-link
              ></span
            >
          </div>

          <div class="col-lg-12 login-form">
            <div class="col-lg-12 login-form">
              <form @submit.prevent="signUp">
                <div class="form-group">
                  <label class="form-control-label">EMAIL</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="new_user.email"
                    @input="checkEmail"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="new_user.name"
                    @input="checkName"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="new_user.password"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="con_pass"
                    required
                  />
                </div>
                <div class="col-lg-12 loginbttm">
                  <div class="col-lg-6 login-btm login-button">
                    <button type="submit" class="btn btn-outline-success">
                      REGISTER
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
      new_user: {
        id: null,
        email: null,
        name: null,
        password: null,
      },
      con_pass: null,
      name_error: false,
      email_error: false,
      pass_error: false,
      info: { name: null, stat: false },
    };
  },
  computed: {
    allAdmins() {
      return this.$store.getters.getAdmins;
    },
    allUsers() {
      return this.$store.getters.getUsers;
    },
    findName() {
      console.log("nAME: ", this.new_user.name);
      console.log(
        "admin name: ",
        this.allAdmins.find((admin) => admin.name == this.new_user.name)
      );
      console.log(
        "user name: ",
        this.allUsers.find((user) => user.name == this.new_user.name)
      );
      if (
        this.allAdmins.find((admin) => admin.name == this.new_user.name) ||
        this.allUsers.find((user) => user.name == this.new_user.name)
      ) {
        console.log("Name Error");
        this.name_error = true;
        return true;
      } else {
        console.log("No name error");
        this.name_error = false;
        return false;
      }
    },
    findUserpass() {
      if (
        this.allUsers.find((user) => user.password == this.new_user.password)
      ) {
        console.log("no pass error");
        return true;
      } else {
        console.log("pass error");
        this.pass_error = false;
        return false;
      }
    },
    findEmail() {
      if (
        this.allAdmins.find((admin) => admin.email == this.new_user.email) ||
        this.allUsers.find((user) => user.email == this.new_user.email)
      ) {
        console.log("Email Error!!");
        this.email_error = true;
        return true;
      } else {
        console.log("No email error");
        this.email_error = false;
        return false;
      }
    },
    // findAdminName() {
    //   if (this.allAdmins.find((admin) => admin.name == this.new_user.name)) {
    //     console.log("admin Name Error");
    //     this.name_error = true;
    //     return true;
    //   } else {
    //     this.name_error = false;
    //     console.log("No admin name error");
    //     return false;
    //   }
    // },
  },
  mounted() {
    this.priceCart();
  },
  methods: {
    priceCart() {
      this.$store.dispatch("closeCart", false);
    },

    signUp() {
      if (this.con_pass != this.new_user.password) {
        console.log("Password Error");
        this.pass_error = true;
      } else {
        console.log("else email: ", this.findEmail);
        console.log("else name: ", this.findName);
        if (this.findEmail != true && this.findName != true) {
          console.log("email: ", this.findEmail);
          console.log("name: ", this.findName);

          this.new_user.id = this.allUsers.length + 1;
          this.$store.dispatch("signUp", this.new_user);
          console.log("dis name: ", this.findName);
          console.log("dis pass: ", this.findUserpass);
          if (this.findName && this.findUserpass) {
            this.info.name = "user";
            this.info.stat = true;
            this.$store.dispatch("setStatus", this.info);
            console.log("Register");
            this.$router.push({ path: "/" });
          }
        } else {
          console.log(
            "!this.pass_error && !this.email_error && !this.name_error"
          );
        }
      }
    },
    checkEmail() {},
    checkName() {},
  },
};
</script>

<style scoped>
@import "../assets/login.css";
</style>
