import { BusinessSizeRepository } from '@domain/ports/repositories/BusinessSizeRepository';
import { BusinessSize, BusinessSizeUpdate } from '@domain/entities/BusinessSize';

export class UpdateBusinessSizeUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(id: number, businessSize: BusinessSizeUpdate): Promise<BusinessSize> {
    return await this.repository.update(id, businessSize);
  }
}
