<template>
	<div style="border: solid 1px black; width: 300px;">
		<table style="width: 300px;">
			<thead>
				<tr>
					<th colspan="2">Shop name</th>
				</tr>
			</thead>
			<tbody>
				<tr style="font-size: 12px;">
					<td>
						Order Number: #{{item.order_id}}
					</td>
					<td style="float:right;">
						Time: {{item.pos_fulfilment_time.split(" ")[1]}}
					</td>
				</tr>
				<tr style="font-size: 12px;">
					<td>
						Date: {{item.pos_fulfilment_time.split(" ")[0]}}
					</td>
				</tr>
				<tr style="font-size: 12px;">
					<td>
						Order type: {{item.fulfilment_type}}
					</td>
					<td style="float:right;">
						Delivary Provider: {{item.fulfilment_source}}
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<hr>
					</td>
				</tr>
			</tbody>
		</table>
		<table style="width: 300px;">
			<tbody>
				<tr style="font-weight: 600; font-size: 12px;" class="item-header">
					<td>No.</td>
					<td style="text-align: center;">Name</td>
					<td>Qty</td>
					<td style="text-align: center;">notes</td>
				</tr>
				<tr style="font-size:12px;" v-for="(product, index) in item.order_lines" :key="index">
					<td>{{index+1}}</td>
					<td>{{product.product.name}}</td>
					<td>{{product.quantity}}</td>
					<td>{{product.note}}</td>
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