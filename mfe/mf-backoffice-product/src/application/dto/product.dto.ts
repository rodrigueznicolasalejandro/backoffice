export interface ProductDto {
  id: number;
  code: string;
  description?: string;
  brand: { id: number; name: string };
  payment_method: { id: number; name: string };
  payment_type: { id: number; name: string };
  currency: { id: number; code: string };
  financing_type: { id: number; name: string };
  card_scope: { id: number; name: string };
  capture_method: { id: number; name: string };
  date_created_at: string;
  date_end_at?: string;
}

export interface ProductCreateDto {
  code: string;
  description?: string;
  brand: { id: number | null; name: string };
  payment_method: { id: number | null; name: string };
  payment_type: { id: number | null; name: string };
  currency: { id: number | null; code: string };
  financing_type: { id: number | null; name: string | null };
  card_scope: { id: number | null; name: string };
  capture_method: { id: number | null; name: string };
}

export interface ProductUpdateDto extends ProductCreateDto {}
