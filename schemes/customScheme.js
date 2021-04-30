import { LocalScheme } from '~auth/runtime';
import { TokenAuthentication } from '@/constants'

export default class CustomScheme extends LocalScheme {
  // async login ({ username, password }) {
  //   // console.log('=====LOGIN=========data==============', data);
  //   // const { username, password } = data; 
  //   console.log('=======username, password======', username, password);
  //   const authData = {
  //     url: TokenAuthentication.TokenUrl,
  //     headers: {
  //       'Authorization': TokenAuthentication.Authorization,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     dataString: `username=${username}&password=${password}&grant_type=${TokenAuthentication.GrantType}`
  //   }

  //   await this.$axios.$post(authData.url, authData.dataString, {
  //     headers: authData.headers
  //   }).then((response) => {
  //     this.loginFail = false;

  //     const customUser = {
  //       fullName: 'test user',
  //       roles: ['user']
  //     }
  //     // this.$auth.setUser(customUser);
  //     // this.$auth.setUserToken(`${response.token_type} ${response.access_token}`, response.refresh_token);

  //     localStorage.setItem("user_token", `${response.token_type} ${response.access_token}`);
  //     this.$router.push('/');
  //   })
  //   .catch((error) => {
  //     this.loginFail = true;
  //   });
  //   // await this.$auth.loginWith('laravel.passport', {
  //   //   data: {
  //   //     // All the 3 parameters below don't seem to be taken into account.
  //   //     username: 'me@home.com',
  //   //     password: '1qaz@WSX',
  //   //     // If 'redirect_uri' is removed from 'nuxt.config.js'
  //   //     // and moved below, logging in returns an error.
  //   //     redirect_uri: '/'
  //   //   }
  //   // }).then((r) => {
  //   //   console.log(r)
  //   // }).catch((e) => {
  //   //   console.log(e)
  //   // })
  // }

  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {
    console.log('=======endpoint======', endpoint);
    console.log('=======this.check().valid======', this.check().valid);
    console.log('=======this.options.endpoints.user======', this.options.endpoints.user);
    // Token is required but not available
    if (!this.check().valid) {
      return
    }
    console.log('=======this.check().valid======2222', this.check().valid);

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      console.log('=======User endpoint is disabled======');
      this.$auth.setUser({})
      return
    }
    
    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    ).then((response) => {
      console.log('=============response', response);
      // const user = getProp(response.data, this.options.user.property)
      const user = response.data;
      
      // Transform the user object
      const customUser = {
        ...user,
        fullName: user.name,
        roles: ['user']
      }
      console.log('=======customUser======', customUser);
      
      // Set the custom user
      // The `customUser` object will be accessible through `this.$auth.user`
      // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
      this.$auth.setUser(customUser)

      return response
    }).catch((error) => {
      console.log('=======error======', error);
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}