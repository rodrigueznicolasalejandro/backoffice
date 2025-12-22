export interface BusinessSize {
  id: number;
  name: string;
  isActive: boolean;
}

export type BusinessSizeCreate = Omit<BusinessSize, 'id'>;
export type BusinessSizeUpdate = BusinessSizeCreate;
