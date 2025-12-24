import { ServiceRepository } from '@domain/ports/repositories/ServiceRepository';
import { Service, ServiceUpdate } from '@domain/entities/Service';

export class UpdateServiceUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(id: string, service: ServiceUpdate): Promise<Service> {
    return this.repository.update(id, service);
  }
}
