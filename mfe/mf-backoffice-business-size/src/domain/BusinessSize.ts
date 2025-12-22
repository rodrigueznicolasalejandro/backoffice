export interface BusinessSize {
  id: number;
  name: string;
}

export type BusinessSizeCreate = Omit<BusinessSize, 'id'>;
export type BusinessSizeUpdate = BusinessSizeCreate;
