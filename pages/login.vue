<template>
  <v-container fluid class="container-main">
    <v-card
      elevation="2"
      class="login-container"
    >
      <LogoLine10 class="logo" /> <!-- TODO : Need to replace with line 10 logo -->
      <v-form v-model="valid" class="login-form-container">
        <v-container>
          <v-row>
            <v-text-field
              v-model="username"
              :rules="userNameRules"
              label="username"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              :type="'password'"
              name="Password"
              label="password"
              :rules="passwordRules"
            ></v-text-field>
          </v-row>
          <v-btn
            class="login-button"
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
      userNameRules: [
        v => !!v || 'Username is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    }),
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
    height: 60px;
    position: absolute;
    right: 20px;
  }
  .login-container {
    padding: 20px;
    min-width: 550px;
    border-radius: 10px;
  }
  .login-form-container {
    padding: 100px 100px 40px 100px;
  }
  .login-button {
    background: #23282c !important;
    color: #ffffff !important;
    border-radius: 10px;
    margin-top: 20px;
    text-transform: capitalize;
    padding: 5px 20px !important;
  }
</style>
