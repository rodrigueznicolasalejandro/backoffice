import { PriceRepository } from '@domain/PriceRepository';
import { Price } from '@domain/Price';
import { PriceUpdateDto } from '../dto/price.dto';

export class UpdatePriceUseCase {
  constructor(private repository: PriceRepository) {}

  async execute(id: number, data: PriceUpdateDto): Promise<Price> {
    return await this.repository.update(id, data);
  }
}
