// import axios from 'axios';

// export const axiosClient = axios.create({
//     baseURL: 'https://api.example.com',
//     timeout: 1000,
//     headers: {'Content-Type': 'application/json'}
// });
import { publicGet } from '@link/security-module';

const baseURL = 'localhost:3000/api';

export const httpClient = {
   get: <T>(url: string) =>publicGet(`${baseURL}${url}`)
};