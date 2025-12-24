import { PriceRepository } from '@domain/ports/repositories/PriceRepository';
import { Price } from '@domain/entities/Price';

export class GetAllPricesUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(): Promise<Price[]> {
    return await this.repository.getAll();
  }
}
