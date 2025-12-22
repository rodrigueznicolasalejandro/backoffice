import { BusinessSizeRepository } from '@domain/BusinessSizeRepository';
import { BusinessSize, BusinessSizeUpdate } from '@domain/BusinessSize';

export class UpdateBusinessSizeUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(id: number, businessSize: BusinessSizeUpdate): Promise<BusinessSize> {
    return await this.repository.update(id, businessSize);
  }
}
