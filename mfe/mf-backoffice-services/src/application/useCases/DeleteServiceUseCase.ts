import { ServiceRepository } from '@domain/ports/repositories/ServiceRepository';

export class DeleteServiceUseCase {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
