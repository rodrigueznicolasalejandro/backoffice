import { PriceRepository } from '@domain/PriceRepository';
import { Price } from '@domain/Price';

export class GetAllPricesUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(): Promise<Price[]> {
    return await this.repository.getAll();
  }
}
