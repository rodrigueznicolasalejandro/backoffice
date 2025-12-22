import { ServiceRepository } from '@domain/ServiceRepository';
import { Service, ServiceCreate } from '@domain/Service';

export class CreateServiceUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(service: ServiceCreate): Promise<Service> {
    return this.repository.create(service);
  }
}
