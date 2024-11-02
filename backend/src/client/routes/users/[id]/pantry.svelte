<script lang="ts">
	export let items: FoodItem[];
</script>

<table>
	<thead>
		<tr>
			<th scope="col">ID</th>
			<th scope="col">Owner ID</th>
			<th scope="col">Name</th>
			<th scope="col">Image</th>
			<th scope="col">Bought Date</th>
			<th scope="col">Expiry Date</th>
		</tr>
	</thead>
	<tbody>
		{#each items as item}
			<tr>
				<td>{item.id}</td>
				<td>{item.userId}</td>
				<td>{item.name}</td>
				<td>{item.image}</td>
				<td>{item.boughtDate}</td>
				<td>{item.expDate}</td>
			</tr>
		{/each}
	</tbody>
</table>
