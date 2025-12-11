import { publicGet } from '@link/security-module';

const baseURL = 'http://localhost:3500/backoffice-bff/api';

export const httpClient = {
   /**
    * por default va securizado
    * get: <T>(url: string) => secureGet(`${baseURL}${url}`)
    */
   public:{
      get: <T>(url: string) =>publicGet(`${baseURL}${url}`)
   }
};