import { ServiceRepository } from '@domain/ServiceRepository';
import { Service } from '@domain/Service';

export class GetServiceByIdUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(id: string): Promise<Service> {
    return this.repository.getById(id);
  }
}
