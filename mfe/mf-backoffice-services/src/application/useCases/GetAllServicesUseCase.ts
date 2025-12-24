import { ServiceRepository } from '@domain/ports/repositories/ServiceRepository';
import { Service } from '@domain/entities/Service';

export class GetAllServicesUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.repository.getAll();
  }
}
