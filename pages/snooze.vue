<template>
	<v-container class="pa-0" id="main-container" fluid>
		<v-layout>
      		<v-flex>
				<v-container>
              		<v-row>
						  <v-col>
							  <img
							   	class="float-right mt-3"
								src="~/assets/LineTen Logo Standard.png"
								width="11%"
							/>
						  </v-col>
              		</v-row>
					<v-row>
						<v-col
							class="col-md-6 col-sm-12" 
						>
							<h3  
								class="h2heading"
							>
								Product Snooze
							</h3>
							<p
								style="font-weight: 500;"
							>
								From here you can snooze products From the available menus</p>
							<hr style="width:80%;"/>
						</v-col>
              		</v-row>
					<v-row>
						<v-col
							class="col-md-4 col-sm-6" 
						>
							<v-select
								:items="overflow_items"
								:dark="isDark"
								:light="isLight"
								outlined
								label="Menus"
								v-model="menu"
								@change="selectMenu(menu)"
								class="rounded-lg"
								height="20px"
								solo
							></v-select>
						</v-col>
						<v-col
							class="col-md-4 col-sm-6 offset-4" 
						>
							<v-text-field
								class="search-input pull-right rounded-lg pa-0"
								label="Search Product Name"
								placeholder="Search Product Name"
								:dark="isDark"
								:light="isLight"
								v-model="searchKey"
								height="20px"
								outlined
								single-line
							></v-text-field>
						</v-col>
              		</v-row>
              		<v-row>
						<v-col
							class="col-md-4 col-sm-4 d-flex justify-start align-baseline" 
						>
							<p style="font-size: 20px;">Only show snoozed products</p>
							<v-switch
								v-model="snoozedProducts"
								value="Snoozed Productss"
								color="primary"
								class="ml-2 mt-0"
								height="30"
								:dark="isDark"
								:light="isLight"
								hide-details
							></v-switch>
						</v-col>
						<v-col
							class="col-md-4 col-sm-4 d-flex justify-start align-baseline" 
						>
							<p style="font-size: 20px;">Turn on all products</p>
							<v-switch
								v-model="allProducts"
								value="All Products"
								color="primary"
								class="ml-2 mt-0"
								height="30"
								:dark="isDark"
								:light="isLight"
								hide-details
							></v-switch>
						</v-col>
              		</v-row>
					<v-row 
						v-for="item in this.menuDetails.product"
						:key="item.product_id"
						class="item-container"
					>
						<v-col class="col-md-5 col-sm-5 offset-1 d-flex justify-start align-center" >
							<h3 style="color:#4f97d5;">{{item.name}}</h3>
						</v-col>
						<v-col class="col-md-5 col-sm-5 d-flex justify-space-between align-baseline" >
							<v-btn
								class="rounded-pill SnoozedBtn py-0"
								x-large
								outlined
								>
								Turn Off
							</v-btn>
							<v-btn
								class="rounded-pill SnoozedBtntest py-0"
								color="black"
								:outlined='testSnoozed'
								x-large
								:light="testcolor"
								>
								Snoozed
							</v-btn>
							<div
								style="width: 30%;"
							>
								<div
									class="d-flex align-baseline"
								>
									<font-awesome-icon
										icon="clock"
										style="font-size: 15px;"
									></font-awesome-icon>
									<h3 style="color:#4f97d5; margin-left: 5px;">05:45</h3>
								</div>
								<p
									class="item-sm-txt"
								>
									time left
								</p>
							</div>
						</v-col>
              		</v-row>
				</v-container>
      		</v-flex>
		</v-layout>
	</v-container>
</template>
<script>

export default {
	data(){
		return{
			testcolor:true,
			testSnoozed:true,
			overflow_items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
			menu: "",
			menuList:[],
			menuDetails:[],
			searchKey:"",
			snoozedProducts:"",
			allProducts:"",
			isDark: false,
			isLight: true,
		}
	},
	mounted(){
		this.getMenulist();
	},
	methods:{
		getMenulist: async function() {
			try {
				this.menuList = await this.$axios.$get("http://localhost:3004/client/1/site/1/menus");
				console.log("res",this.menuList);
				if (this.menuList.length> 0) {
					let arr = [];
					this.overflow_items = [];
					for (let obj = 0; obj < this.menuList.length; obj++) {
						const element = this.menuList[obj];
						arr.push(element.name);
					}
					this.overflow_items = arr;
					
				}
			} catch (error) {
				consol.log("menu",error);
			}
		},
		selectMenu: async function(name) {
			let menuName = name;
			let menuId = 0;
			for (let item = 0; item < this.menuList.length; item++) {
				const element = this.menuList[item];
				if (element.name === menuName) {
					menuId = element.menu_id;
				}
			}
			try {
				let response = await this.$axios.$get("http://localhost:3004/client/1/site/1/menu/"+menuId);
				console.log("detail",response)
				this.menuDetails = response[0];
			} catch (error) {
				console.log(error);
			}
		}
	}
}
</script>

<style scoped>
#main-container {
	background: #f6f8fa;
	color: black;	
}
.h2heading {
	color:#4f97d5;
	font-weight: 400;
}
.SnoozedBtn{
	border: 1px solid black !important;
	color: black !important;
	width: 30% !important;
	height: 40px !important;
	font-size: 13px !important;
	font-weight: 600 !important;
}
.SnoozedBtntest{
	width: 30% !important;
	height: 40px !important;
	font-size: 13px !important;
	font-weight: 600 !important;
}
.item-container {
	background: white;
	margin-bottom: 20px;
	max-height: 66px;
}
.item-sm-txt {
	font-size: 12px;
	font-weight: 500;
	margin-bottom: 0px;
}
</style>