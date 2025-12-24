import { ServiceRepository } from '@domain/ports/repositories/ServiceRepository';
import { Service, ServiceCreate } from '@domain/entities/Service';

export class CreateServiceUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(service: ServiceCreate): Promise<Service> {
    return this.repository.create(service);
  }
}
