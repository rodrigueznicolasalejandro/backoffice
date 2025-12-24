import { PriceRepository } from '@domain/ports/repositories/PriceRepository';
import { Price } from '@domain/entities/Price';
import { httpClient } from '../../config/httpClient';

export class PriceApiRepository implements PriceRepository {
  private basePath = '/prices';

  async getAll(): Promise<Price[]> {
    const response = await httpClient.get<{ success: boolean; data: { prices: Price[] } }>(`${this.basePath}`);
    return response.data.data.prices;
  }

  async getById(id: number): Promise<Price | null> {
    try {
      const response = await httpClient.get<{ success: boolean; data: { price: Price } }>(`${this.basePath}/${id}`);
      return response.data.data.price;
    } catch (error) {
      return null;
    }
  }

  async create(price: Omit<Price, 'id'>): Promise<Price> {
    const response = await httpClient.post<{ success: boolean; data: Price }>(`${this.basePath}`, price);
    return response.data.data;
  }

  async update(id: number, price: Partial<Price>): Promise<Price> {
    const response = await httpClient.put<{ success: boolean; data: Price }>(`${this.basePath}/${id}`, price);
    return response.data.data;
  }

  async delete(id: number): Promise<boolean> {
    try {
      await httpClient.delete(`${this.basePath}/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
