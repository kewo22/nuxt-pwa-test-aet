<template>
	<div class="login-container">
		<div class="form-container">
			<label for="email">Username:</label><br>
			<input type="email" v-model="username" id="email" name="email" class="login-input"><br>
			<label for="pwd">Password:</label><br>
			<input type="password"  v-model="password" id="pwd" name="pwd" class="login-input"><br><br>
			<input id="submit-btn" type="submit" @click="login">
		</div>
	</div>
</template>
<script>
export default {
	data: function () {
		return {
			username:"",
			password: "",
			mountains:{}
		}
	},
	methods:{
		login: async function() {
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
</script>

<style scoped>
.login-container {
	display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
	height: 100vh;
	background-color: #23282C;
}
.form-container {
	display: flex;
    flex-direction: column;
	width: 40%;
	padding: 5%;
	border-radius: 10px;
	background-color: #fff;
}

</style>