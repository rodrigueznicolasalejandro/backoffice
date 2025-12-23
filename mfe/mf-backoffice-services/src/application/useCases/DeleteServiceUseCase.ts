import { ServiceRepository } from '@domain/ServiceRepository';

export class DeleteServiceUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
