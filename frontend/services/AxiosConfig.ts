import axios from 'axios';

const api = axios.create({
	baseURL: 'https://hktn.jasonxu.dev',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json'
		// 'ngrok-skip-browser-warning': 'abc',
	}
});

export default api;

