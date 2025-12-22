// import { publicGet } from '@link/security-module';

const baseURL = 'http://localhost:3500/backoffice-bff/api';

interface HttpResponse<T> {
   data: T;
   status: number;
}

const getHeaders = (): Record<string, string> => {
   const token = localStorage.getItem('jwt_token');
   const headers: Record<string, string> = {
      'Content-Type': 'application/json',
   };
   if (token) {
      headers['Authorization'] = `Bearer ${token}`;
   }
   return headers;
};

export const httpClient = {
   /**
    * GET securizado - requiere JWT token
    */
   get: async <T>(url: string): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'GET',
         headers: getHeaders(),
      });
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, status: response.status };
   },
   
   /**
    * POST securizado - requiere JWT token
    */
   post: async <T>(url: string, body: any): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'POST',
         headers: getHeaders(),
         body: JSON.stringify(body),
      });
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, status: response.status };
   },
   
   /**
    * PUT securizado - requiere JWT token
    */
   put: async <T>(url: string, body: any): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'PUT',
         headers: getHeaders(),
         body: JSON.stringify(body),
      });
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, status: response.status };
   },
   
   /**
    * DELETE securizado - requiere JWT token
    */
   delete: async <T>(url: string): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'DELETE',
         headers: getHeaders(),
      });
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, status: response.status };
   },
   
   /**
    * GET público - sin autenticación
    */
   public: {
      get: async <T>(url: string): Promise<HttpResponse<T>> => {
         const response = await fetch(`${baseURL}${url}`);
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const data = await response.json();
         return { data, status: response.status };
      }
   }
};