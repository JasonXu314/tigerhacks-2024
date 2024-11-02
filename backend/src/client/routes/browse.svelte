<script lang="ts">
	import { onMount } from 'svelte';

	export let offers: BrowseOffersProps['offers'];

	let city: string | null = null;

	onMount(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			fetch(`/city?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`)
				.then((res) => res.text())
				.then((c) => (city = c));
		});
	});
</script>

<table>
	<thead>
		<tr>
			<th scope="col">Name</th>
			<th scope="col">Owner</th>
			<th scope="col">Location</th>
			<th scope="col"></th>
		</tr>
	</thead>
	<tbody>
		{#each city ? offers.filter((offer) => offer.location === city) : offers as offer}
			<tr>
				<td>{offer.foodItem.name}</td>
				<td>{offer.owner.firstName}</td>
				<td>{offer.location}</td>
				<td>
					<button
						class="error"
						on:click={() =>
							fetch(`/${offer.userId}/offers/${offer.foodId}`, { method: 'DELETE' })
								.then(() => location.reload())
								.catch(() => location.reload())}>Delete</button
					>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
