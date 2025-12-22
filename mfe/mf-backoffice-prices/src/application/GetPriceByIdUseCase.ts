import { PriceRepository } from '@domain/PriceRepository';
import { Price } from '@domain/Price';

export class GetPriceByIdUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(id: number): Promise<Price | null> {
    return await this.repository.getById(id);
  }
}
