import { ServiceRepository } from '@domain/ports/repositories/ServiceRepository';
import { Service } from '@domain/entities/Service';

export class GetServiceByIdUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(id: string): Promise<Service> {
    return this.repository.getById(id);
  }
}
