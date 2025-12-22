import { ServiceRepository } from '@domain/ServiceRepository';
import { Service, ServiceCreate, ServiceUpdate } from '@domain/Service';
import { httpClient } from './config/httpClient';

export class ServiceApiRepository implements ServiceRepository {
  private readonly basePath = '/services';

  async getAll(): Promise<Service[]> {
    const response = await httpClient.get<{ success: boolean; data: { services: Service[] } }>(this.basePath);
    return response.data.data.services;
  }

  async getById(id: string): Promise<Service> {
    const response = await httpClient.get<{ success: boolean; data: Service }>(`${this.basePath}/${id}`);
    return response.data.data;
  }

  async create(service: ServiceCreate): Promise<Service> {
    const response = await httpClient.post<{ success: boolean; data: Service }>(this.basePath, service);
    return response.data.data;
  }

  async update(id: string, service: ServiceUpdate): Promise<Service> {
    const response = await httpClient.put<{ success: boolean; data: Service }>(`${this.basePath}/${id}`, service);
    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`${this.basePath}/${id}`);
  }
}
