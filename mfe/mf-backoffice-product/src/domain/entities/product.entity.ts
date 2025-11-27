
export interface Product {
  id: number;
  code: string;
  description?: string;
  brand: {id: number; name: string};
  payment_method: {id: number; name: string};
  payment_type: {id: number; name: string};
  currency: {id: number; code: string};
  financing_type: {id: number; name: string};
  card_scope: {id: number; name: string};
  capture_method: {id: number; name: string};
  date_created_at: string; // ISO string para TIMESTAMP
  date_end_at?: string;    // Puede ser null
}