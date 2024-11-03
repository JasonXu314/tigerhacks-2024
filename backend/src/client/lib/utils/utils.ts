export function formatDate(date: Date): string {
	const month = date.getMonth();
	const day = date.getDate();
	const year = date.getFullYear().toString().slice(2);

	return `${month}/${day}/${year}`;
}
