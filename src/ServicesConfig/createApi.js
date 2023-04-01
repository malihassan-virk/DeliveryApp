import axios from 'axios';
import { API_BaseURL } from './api';

var apiAuth = axios.create({
    baseURL: API_BaseURL,
	headers: {
		'Cache-Control': 'no-cache',
		'Accept': 'application/json',
		//'Content-Type': 'multipart/form-data',
		Authorization: ``
	},
	timeout: 500000
  });

export default { apiAuth };