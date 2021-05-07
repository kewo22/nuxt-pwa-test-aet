<template>
  <v-container fluid class="container-main">
    <v-card elevation="2" class="login-container">
      <LogoLine10 class="logo" />
      <v-form
        ref="loginForm"
        class="login-form-container"
        v-if="!passWordResetToken"
      >
        <v-row>
          <v-text-field
            v-model="email"
            :rules="[rules.emailRequired, rules.emailValid]"
            label="Email"
            required
            class="login-input"
          ></v-text-field>
        </v-row>
        <v-btn class="login-button" outlined @click="cancel"> Cancel </v-btn>
        <v-btn class="login-button" @click="send"> Send </v-btn>

        <v-alert color="red" dark class="login-error" v-if="invalidUserEmail">
          User not found
        </v-alert>
      </v-form>

      <v-form ref="newPasswordForm" class="login-form-container" v-else>
        <v-row>
          <v-text-field
            v-model="password"
            :type="'password'"
            name="New Password"
            label="New Password"
            :rules="[rules.passwordRequired]"
            class="login-input"
          ></v-text-field>
        </v-row>
        <v-btn class="login-button" @click="resetPassword">
          Reset Password
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  options: {
    layout: "empty",
  },
  data() {
    return {
      invalidUserEmail: "",
      email: "",
      password: "",
      rules: {
        emailRequired: (value) => !!value || "Email is required",
        passwordRequired: (value) => !!value || "Password is required",
        emailValid: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      passWordResetToken: "",
    }; // ret end
  },
  methods: {
    async send() {
      if (this.$refs.loginForm.validate()) {
        await this.$axios
          .get(
            `https://api-l10-idp-staging-neu.azurewebsites.net/api/users/reset-password/${this.email}`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            this.invalidUserEmail = false;
            this.passWordResetToken = res.data;
          })
          .catch((err) => {
            this.invalidUserEmail = true;
          })
          .finally(() => {
            this.$refs.newPasswordForm.reset();
            this.$refs.newPasswordForm.resetValidation();
          });
      }
    },
    async resetPassword() {
      if (this.$refs.newPasswordForm.validate()) {
        const x = {
          email: this.email,
          token: this.passWordResetToken,
          password: this.password,
        };

        await this.$axios
          .post(
            `https://api-l10-idp-staging-neu.azurewebsites.net/api/users/reset-password`,
            x,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((res) => {
            this.$router.push("/login");
          })
          .catch((err) => {
            console.log("from err --------- ", err);
          });
      }
    },
    cancel() {
      this.$router.push("/login");
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




