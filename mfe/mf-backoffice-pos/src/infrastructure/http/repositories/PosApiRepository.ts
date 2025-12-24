import { PosRepository } from '@domain/ports/repositories/PosRepository';
import { Pos } from '@domain/entities/Pos';
import { httpClient } from '../../config/httpClient';

export class PosApiRepository implements PosRepository {
  private basePath = '/pos';

  async getAll(): Promise<Pos[]> {
    const response = await httpClient.get<{ success: boolean; data: { pos: Pos[] } }>(`${this.basePath}`);
    return response.data.data.pos;
  }

  async getById(id: string): Promise<Pos | null> {
    try {
      const response = await httpClient.get<{ success: boolean; data: Pos }>(`${this.basePath}/${id}`);
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async create(pos: Pos): Promise<Pos> {
    const response = await httpClient.post<{ success: boolean; data: Pos }>(`${this.basePath}`, pos);
    return response.data.data;
  }

  async update(id: string, pos: Partial<Pos>): Promise<Pos> {
    const response = await httpClient.put<{ success: boolean; data: Pos }>(`${this.basePath}/${id}`, pos);
    return response.data.data;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await httpClient.delete(`${this.basePath}/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
