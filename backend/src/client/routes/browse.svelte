<script lang="ts">
	import { formatDate } from '$lib/utils/utils';
	import { onMount } from 'svelte';

	export let offers: BrowseOffersProps['offers'];

	let city: string | null = null,
		query: string = '';

	onMount(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			fetch(`/city?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`)
				.then((res) => res.text())
				.then((c) => (city = c));
		});
	});

	$: byCity = city ? offers.filter((offer) => offer.location === city) : offers;
	$: filtered =
		query === ''
			? byCity
			: byCity.filter((offer) => {
					const value = offer.foodItem.name.toLowerCase();
					const q = query.toLowerCase();
					const vws = value.replace(/\s/g, '');
					const qws = q.replace(/\s/g, '');
					const vFrags = value.split(/\s/).filter((f) => f !== '');
					const qFrags = q.split(/\s/).filter((f) => f !== '');

					return (
						value.includes(q) ||
						q.includes(value) ||
						vws.includes(qws) ||
						qws.includes(vws) ||
						qFrags.every((f) => vFrags.some((fragment) => fragment.includes(f) || f.includes(fragment)))
					);
				});
</script>

<header>
	<div class="container">
		<h1>Community Food</h1>
	</div>
</header>
<main class="container">
	<div class="search">
		<input type="search" bind:value={query} />
		<!-- <i class="fa-solid fa-filter"></i> -->
	</div>
	{#each filtered as offer}
		<div class="food">
			<div class="left">
				<h2>{offer.foodItem.name}</h2>
				<h3>{formatDate(offer.foodItem.expDate)}</h3>
			</div>
			<div class="right">
				<h4>{offer.owner.phone}</h4>
			</div>
		</div>
	{/each}
</main>

<!-- <table>
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
</table> -->

<style>
	:root {
		--background-color: #f3f5fc;
		--color: black;
	}

	header {
		background-color: #6dc47e;
		border-bottom: 8px solid #439c54;
	}

	.food {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 1em 2em;
	}

	.food:not(:last-child) {
		border-bottom: 1px solid #c3c5cc;
	}

	.food h2 {
		font-size: 1.5rem;
		margin: 0;
		--color: black;
	}

	.food :is(h3, h4) {
		--color: #606c38;
		font-size: 0.9rem;
		margin: 0;
	}

	div.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1em;
	}

	div.search input {
		--background-color: #e7e9f2;
		--border-width: 0;
		--form-element-active-border-color: #6dc47e;
		--form-element-focus-color: #6dc47e;
		--color: black;
		margin-bottom: 0;
	}

	div.search input::-webkit-search-cancel-button {
		display: none;
	}

	div.search i {
		color: #6dc47e;
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>
