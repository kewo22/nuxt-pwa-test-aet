<template>
  <v-container fluid class="container-main">
    <v-card elevation="2" class="login-container">
      <LogoLine10 class="logo" />
      <v-form ref="loginForm" class="login-form-container">
        <v-row>
          <v-text-field
            v-model="username"
            :rules="[rules.usernameRequired, rules.emailValid]"
            label="username"
            required
            class="login-input"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :type="'password'"
            name="Password"
            label="password"
            :rules="[rules.passwordRequired]"
            class="login-input"
          ></v-text-field>
        </v-row>
        <v-btn class="login-button" @click="login"> Login </v-btn>
        <NuxtLink to="/forgotPassword"> Forgot Password ? </NuxtLink>
        <v-alert color="red" dark class="login-error" v-if="loginFail">
          If you can not login, Please contact ‘support@lineten.com.’
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { TokenAuthentication } from "@/constants";
import jwt_decode from "jwt-decode";

export default {
  options: {
    layout: "empty",
  },
  data() {
    return {
      loginFail: false,
      username: "",
      password: "",
      rules: {
        usernameRequired: (value) => !!value || "Username is required",
        passwordRequired: (value) => !!value || "Password is required",
        emailValid: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      userId: "",
    }; // ret end
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  methods: {
    async login() {
      const x = `username=${this.username}&password=${this.password}&grant_type=${TokenAuthentication.GrantType}`;

      await this.$axios
        .post(
          `https://api-l10-idp-staging-neu.azurewebsites.net/connect/token`,
          x,
          {
            headers: {
              Authorization: "Basic c3RhZ2luZ19yZWNvbmNpbGlhdGlvbl93ZWI6",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          //   console.log("from then --------- ", res);
          const decoded = jwt_decode(res.data.access_token);
          // console.log(res.data.access_token);
          // console.log(decoded);
          this.userId = decoded.sub;
          this.$router.push("/orders");
        })
        .catch((err) => {
          console.log("from err --------- ", err);
        })
        .finally(async () => {
          console.log("store token ", this.$store.state.token);
          await this.$axios
            .get(
              `https://api-l10-idp-staging-neu.azurewebsites.net/api/users/${this.userId}`,
              {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              }
            )
            .then((res) => {
              // console.log(res.data);
              this.$store.dispatch("setUser", res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
    test() {
      // console.log(this.$store.state.user);
    },
  }, // meth
};
</script>

<style>
.container-main {
  margin: 0;
  min-height: 100vh;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #23282c;
}
.logo {
  width: 130px;
  position: absolute;
  right: 20px;
}
.login-container {
  padding: 20px;
  max-width: 960px;
  border-radius: 10px;
}
.login-form-container {
  padding: 75px 140px 50px 140px;
}
.login-input .v-label {
  font-size: 13px;
}
.login-input input {
  font-size: 22px;
}
.login-button {
  font-size: 13px;
  background: #23282c !important;
  color: #ffffff !important;
  border-radius: 20px;
  margin-top: 35px;
  text-transform: capitalize;
  padding: 10px 45px !important;
}
.login-error {
  max-width: 220px;
  margin: 20px 0 0 0;
  font-size: 12px;
}
</style>




