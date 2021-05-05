<template>
	<div style="border: solid 1px black; width: 350px;">
		<table>
			<thead>
				<tr>
					<th colspan="2">Shop name</th>
				</tr>
			</thead>
			<tbody>
				<tr style="padding: 5px;">
					<td>
						Order Number: #{{item.order_id}}
					</td>
					<td style="float:right;">
						Time: {{item.pos_fulfilment_time.split(" ")[1]}}
					</td>
				</tr>
				<tr style="padding: 5px;">
					<td>
						Date: {{item.pos_fulfilment_time.split(" ")[0]}}
					</td>
				</tr>
				<tr class="pa-1">
					<td>
						Order type: {{item.fulfilment_type}}
					</td>
					<td class="float-right">
						Delivary Provider: {{item.fulfilment_source}}
					</td>
				</tr>
				<tr class="pa-1">
					<td colspan="2">
						<hr>
					</td>
				</tr>
			</tbody>
		</table>
		<table>
			<tbody>
				<tr class="item-header">
					<td class="pa-1">No.</td>
					<td class="pa-1">Name</td>
					<td class="pa-1">Qty</td>
					<td style="float:right;" class="pa-1">Amount</td>
				</tr>
				<tr v-for="(product, index) in item.order_lines" :key="index">
					<td class="pa-1">{{index+1}}</td>
					<td class="pa-1">{{product.product.name}}</td>
					<td class="pa-1">{{product.quantity}}</td>
					<td style="float:right;" class="pa-1">£{{product.total}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
  props: ["item"]
};
</script>
<style scoped>
.billDiv {
	border: solid 1px black;
	background-color: rgb(206, 98, 98);
}
table tbody tr {
	font-size: 10px;
}

.item-header {
	font-weight: 600;
}
</style>