import { MccRepository } from '@domain/MccRepository';
import { Mcc, MccCreate, MccUpdate } from '@domain/Mcc';
import { httpClient } from './config/httpClient';

export class MccApiRepository implements MccRepository {
  private readonly basePath = '/mcc';

  async getAll(): Promise<Mcc[]> {
    const response = await httpClient.get<Mcc[]>(this.basePath);
    return response.data;
  }

  async getById(id: number): Promise<Mcc> {
    const response = await httpClient.get<Mcc>(`${this.basePath}/${id}`);
    return response.data;
  }

  async create(mcc: MccCreate): Promise<Mcc> {
    const response = await httpClient.post<Mcc>(this.basePath, mcc);
    return response.data;
  }

  async update(id: number, mcc: MccUpdate): Promise<Mcc> {
    const response = await httpClient.put<Mcc>(`${this.basePath}/${id}`, mcc);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(`${this.basePath}/${id}`);
  }
}
