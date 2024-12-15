import axios from 'axios';

const API = axios.create({
    baseURL: 'http://202.10.42.158:3001', // URL backend
});

export const createTransaction = (data) => API.post('/Proses_payment', data);
