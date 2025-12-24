import { PriceRepository } from '@domain/ports/repositories/PriceRepository';
import { Price } from '@domain/entities/Price';

export class GetPriceByIdUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(id: number): Promise<Price | null> {
    return await this.repository.getById(id);
  }
}
