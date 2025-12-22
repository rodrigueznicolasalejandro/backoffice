import { PriceRepository } from '@domain/PriceRepository';

export class DeletePriceUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
