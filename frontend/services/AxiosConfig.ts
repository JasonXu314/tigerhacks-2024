import axios from 'axios';

const api = axios.create({
	baseURL: 'https://2f63-161-130-190-21.ngrok-free.app/',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json',
		// 'ngrok-skip-browser-warning': 'abc',
	},
});

export default api;
