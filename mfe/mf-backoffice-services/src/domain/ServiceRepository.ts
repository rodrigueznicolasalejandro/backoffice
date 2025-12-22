import { Service, ServiceCreate, ServiceUpdate } from './Service';

export interface ServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: string): Promise<Service>;
  create(service: ServiceCreate): Promise<Service>;
  update(id: string, service: ServiceUpdate): Promise<Service>;
  delete(id: string): Promise<void>;
}
