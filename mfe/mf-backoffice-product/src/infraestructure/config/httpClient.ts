import { publicGet } from '@link/security-module';

const baseURL = 'http://localhost:3500/api';

export const httpClient = {
   get: <T>(url: string) =>publicGet(`${baseURL}${url}`)
};