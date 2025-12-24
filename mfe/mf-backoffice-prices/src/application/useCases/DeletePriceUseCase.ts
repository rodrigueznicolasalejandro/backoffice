import { PriceRepository } from '@domain/ports/repositories/PriceRepository';

export class DeletePriceUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
