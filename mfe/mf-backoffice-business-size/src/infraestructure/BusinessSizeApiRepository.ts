import { BusinessSizeRepository } from '@domain/BusinessSizeRepository';
import { BusinessSize, BusinessSizeCreate, BusinessSizeUpdate } from '@domain/BusinessSize';
import { httpClient } from './config/httpClient';

export class BusinessSizeApiRepository implements BusinessSizeRepository {
  private readonly basePath = '/business-size';

  async getAll(): Promise<BusinessSize[]> {
    const response = await httpClient.get<BusinessSize[]>(this.basePath);
    return response.data;
  }

  async getById(id: number): Promise<BusinessSize> {
    const response = await httpClient.get<BusinessSize>(`${this.basePath}/${id}`);
    return response.data;
  }

  async create(businessSize: BusinessSizeCreate): Promise<BusinessSize> {
    const response = await httpClient.post<BusinessSize>(this.basePath, businessSize);
    return response.data;
  }

  async update(id: number, businessSize: BusinessSizeUpdate): Promise<BusinessSize> {
    const response = await httpClient.put<BusinessSize>(`${this.basePath}/${id}`, businessSize);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(`${this.basePath}/${id}`);
  }
}
