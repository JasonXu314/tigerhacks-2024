<script lang="ts">
	export let users: User[];
</script>

<table>
	<thead>
		<tr>
			<th scope="col">ID</th>
			<th scope="col">First Name</th>
			<th scope="col">Last Name</th>
			<th scope="col">Phone</th>
			<th scope="col">Token</th>
			<th scope="col">Verified</th>
			<th scope="col"></th>
		</tr>
	</thead>
	<tbody>
		{#each users as user}
			<tr>
				<td>{user.id}</td>
				<td>{user.firstName}</td>
				<td>{user.lastName}</td>
				<td>{user.phone}</td>
				<td>{user.token}</td>
				<td>{user.verified ? '✅' : '❌'}</td>
				<td>
					<button
						class="error"
						on:click={() =>
							fetch(`/users/${user.id}`, { method: 'DELETE' })
								.then(() => location.reload())
								.catch(() => location.reload())}>Delete</button
					>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
