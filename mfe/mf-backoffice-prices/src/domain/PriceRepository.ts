import { Price } from './Price';

export interface PriceRepository {
  getAll(): Promise<Price[]>;
  getById(id: number): Promise<Price | null>;
  create(price: Omit<Price, 'id'>): Promise<Price>;
  update(id: number, price: Partial<Price>): Promise<Price>;
  delete(id: number): Promise<boolean>;
}
