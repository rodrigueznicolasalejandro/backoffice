// import { publicGet } from '@link/security-module';

const baseURL = 'http://localhost:3000/api/v1';

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

const handleResponse = async <T>(response: Response): Promise<HttpResponse<T>> => {
   if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error en la solicitud' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
   }
   const data = await response.json();
   return { data, status: response.status };
};

export const httpClient = {
   get: async <T>(url: string): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'GET',
         headers: getHeaders(),
      });
      return handleResponse<T>(response);
   },
   
   post: async <T>(url: string, body: any): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'POST',
         headers: getHeaders(),
         body: JSON.stringify(body),
      });
      return handleResponse<T>(response);
   },
   
   put: async <T>(url: string, body: any): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'PUT',
         headers: getHeaders(),
         body: JSON.stringify(body),
      });
      return handleResponse<T>(response);
   },
   
   patch: async <T>(url: string, body: any): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'PATCH',
         headers: getHeaders(),
         body: JSON.stringify(body),
      });
      return handleResponse<T>(response);
   },
   
   delete: async <T>(url: string): Promise<HttpResponse<T>> => {
      const response = await fetch(`${baseURL}${url}`, {
         method: 'DELETE',
         headers: getHeaders(),
      });
      return handleResponse<T>(response);
   },
};