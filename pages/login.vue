<template>
  <v-container fluid class="container-main">
    <v-card
      elevation="2"
      class="login-container"
    >
      <LogoLine10 class="logo" />
      <v-form ref="loginForm" class="login-form-container">
        <v-container>
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
          <v-btn
            class="login-button"
            @click="login"
          >
            Login
          </v-btn>
          <v-alert
            color="red"
            dark
            class="login-error"
            v-if="loginFail"
          >
            If you can not login, Please contact ‘support@lineten.com.’
          </v-alert>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import { TokenAuthentication } from '@/constants'

  export default {
    data: () => ({
      loginFail: false,
      username: '',
      password: '',
      rules: {
        usernameRequired: value => !!value || 'Username is required',
        passwordRequired: value => !!value || 'Password is required',
        emailValid: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }),
    methods:{
      login: async function({ $axios }) {
        const isValid = this.$refs.loginForm.validate();

        if (isValid) {
          const authData = {
            url: TokenAuthentication.TokenUrl,
            headers: {
              'Authorization': TokenAuthentication.Authorization,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            dataString: `username=${this.username}&password=${this.password}&grant_type=${TokenAuthentication.GrantType}`
          }

          await this.$axios.$post(authData.url, authData.dataString, {
            headers: authData.headers
          }).then((response) => {
            this.loginFail = false;
            localStorage.setItem("user_token", `${response.token_type} ${response.access_token}`);
            this.$router.push('/');
          })
          .catch((error) => {
            this.loginFail = true;
          });
        }
      }
    }
  }
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
  .login-input input{
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

