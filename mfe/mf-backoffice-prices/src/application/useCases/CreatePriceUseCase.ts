import { PriceRepository } from '@domain/PriceRepository';
import { Price } from '@domain/Price';
import { PriceCreateDto } from '../dto/price.dto';

export class CreatePriceUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(data: PriceCreateDto): Promise<Price> {
    return await this.repository.create(data);
  }
}
