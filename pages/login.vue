<template>
  <v-container fluid class="container-main">
    <v-card
      elevation="2"
      class="login-container"
    >
      <LogoLine10 class="logo" />
      <v-form ref="loginForm" lazy-validation v-model="valid" class="login-form-container">
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
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
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
      login: function() {
        const isValid = this.$refs.loginForm.validate();
        if (isValid) {
        let checkUsername = false;
        if (this.username === "" || this.password === "" || this.password !== "cityslicka") {
          window.alert("Plese valid enter username and password");
        }else {
          let obj = {
            "email":this.username, // eve.holt@reqres.in
            "password":this.password //cityslicka
          };

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", "__cfduid=ddfe91fe29ce404c0606b4094e0e912bd1618244858");

          var raw = JSON.stringify(obj);

          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };
          let self = this;
          fetch("https://reqres.in/api/login", requestOptions)
          .then(function(response) {
            if(response.status === 200){
              response.blob().then(
              response => response.text()
              ).then(result => localStorage.setItem("user_token",result))
              self.$router.push('/');
            } else {
              window.alert("Invalid login");
            }
          })
          .catch(
            error => console.log('error', error)
          );

        }
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
</style>

