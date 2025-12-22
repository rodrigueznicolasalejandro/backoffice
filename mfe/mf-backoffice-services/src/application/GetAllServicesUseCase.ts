import { ServiceRepository } from '@domain/ServiceRepository';
import { Service } from '@domain/Service';

export class GetAllServicesUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.repository.getAll();
  }
}
