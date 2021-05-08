<template>
	<div style="border: solid 1px lightgray; width: 150px; padding: 10px;">
		<table style="width: 150px;">
			<thead>
				<tr>
					<th style="text-align: center; text-align: -webkit-center;" colspan="2">
          				<img :src="getImage" width="70%" style="padding-bottom: 7px;" />
					</th>
				</tr>
				<tr style="width: 150px;">
					<th style="width: 150px; text-align: -webkit-center;" colspan="2">
          				<div 
						  id="typeDiv" 
						  style="width: width: 150px; background-color: black !important; padding: 5px;margin: auto; border-radius: 5px; color: white;text-align: -webkit-center;text-align: center;">
						  <h4 style="margin: auto;font-weight: 300;font-family: sans-serif;">{{fulfilmentType}}</h4>
						</div>
					</th>
				</tr>
				<tr>
					<th style="text-align: center; text-align: -webkit-center;" colspan="2">
          				<h3 
						  style="padding-top: 7px; font-family: sans-serif; font-weight: 800; margin: auto;" 
						>
							#{{item.order_number}}</h3>
					</th>
				</tr>
				<tr>
					<th style="border-bottom: 1px dashed black;" colspan="2">
          				<span 
						  style="font-family: sans-serif; font-weight: 300; font-size: 13px; float: left; padding-bottom: 10px;" 
						>
							Rider collects: {{(item.pos_fulfilment_time.split(" ")[1]).split(":")[0] + ":" + (item.pos_fulfilment_time.split(" ")[1]).split(":")[1]}}
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style="border-bottom: 1px dashed black;">
          				<p 
						  style="font-family: sans-serif; font-weight: bold; font-size: 10px; float: left;margin: auto; padding-top: 10px;" 
						>
							<b>DELIVARY NOTES</b>
						</p>
						<p 
						  style="font-family: sans-serif; font-size: 10px; font-weight: 300; color: gray; float: left; margin: auto; padding-bottom: 10px;" 
						>
							{{item.notes}}
						</p>
					</td>
				</tr>
				<tr>
					<td style="border-bottom: 1px dashed black;">
          				<p 
						  style="font-family: sans-serif; font-weight: bold; font-size: 10px; float: left;margin: auto; padding-top: 10px;" 
						>
							<b>SUBMITTED ON</b>
						</p>
						<p 
						  style="font-family: sans-serif; font-size: 10px; color: gray; font-weight: 300; float: left; margin: auto; padding-bottom: 10px;" 
						>
							{{item.pos_state_updated_at}}
						</p>
					</td>
				</tr>
				<tr>
					<td style="border-bottom: 1px dashed black;">
          				<p 
						  style="font-family: sans-serif; font-weight: bold; font-size: 10px; float: left;margin: auto; padding-top: 10px;" 
						>
							<b>ORDER NOTES</b>
						</p>
						<p 
						  style="font-family: sans-serif; font-size: 10px; color: gray; font-weight: 300; float: left; margin: auto; padding-bottom: 10px;" 
						>
							{{item.notes}}
						</p>
					</td>
				</tr>
				<tr>
					<td>
          				<p 
						  style="font-family: sans-serif; font-weight: bold; font-size: 10px; float: left;margin: auto; width: 100%;display: flex; justify-content: space-between; align-items: center;" 
						>
							<span style="display: flex; align-items: center; margin-left: -6px;"><img src="~/assets/Menu_icon_icon-icons.com_71858.png" width="auto" height="100%"><b>ITEMS</b></span><span style="float: right">{{item.order_lines.length}}</span>
						</p>
					</td>
				</tr>
				<tr v-for="(product, index) in item.order_lines" :key="index">
					<td>
          				<p 
						  style="font-family: sans-serif; font-weight: 400; font-size: 10px; float: left;margin: auto;" 
						>
							<span>{{product.quantity}} X </span><span>{{product.product.name}}</span>
						</p>
						<p
						  style="font-family: sans-serif; font-weight: 300; font-size: 8px; float: left;margin: auto; padding-top: 2px; padding-bottom: 10px" 
						>
							<span>{{product.note}}</span>
						</p>
					</td>
				</tr>
				<tr>
					<td style="border-top: 1px dashed black; border-bottom: 1px dashed black;">
          				<p 
						  style="font-family: sans-serif; margin: auto; padding-top: 10px; padding-bottom: 10px; width: 100%; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed; margin-bottom: 3px;" 
						>
							<span style="font-size: 10px;">TOTAL</span><span style="font-size: 12px;float: right; font-weight: 900;">{{order_amount}}</span>
						</p>
					</td>
				</tr>
				<tr>
					<td>
						<p 
						  style="font-family: sans-serif; padding-top: 10px; margin: auto; width: 100%; text-align: -webkit-center;" 
						>
							<span style="font-size: 8px;">Thank you &amp; enjoy your meal!<img src="~/assets/smilingface_85784.png" style="margin-left: 5px;" width="auto" height="8px"></span>
						</p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
  props: ["item"],
  computed: {
    getImage() {
      const { item } = this.$props;
      return this.$getMarketplaceImages(item.fulfilment_source, "full");
    },
	fulfilmentType() {
      if ([`collection`, `walk-in`].includes(this.item.fulfilment_type)) {
        return "PICKUP";
      }
      return "DELIVERY";
    },
	order_amount() {
      return this.$currency(this.$props.item.total);
    },
  }
};
</script>
<style>
@media print {
    #typeDiv{
        background-color: black !important;
		color: white;
    }
}
</style>