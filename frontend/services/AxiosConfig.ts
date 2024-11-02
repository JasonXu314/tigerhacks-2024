import axios from 'axios';

const api = axios.create({
	baseURL: 'https://bd1f-161-130-190-28.ngrok-free.app/',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json',
		// 'ngrok-skip-browser-warning': 'abc',
	},
});

export default api;
