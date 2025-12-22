import { BusinessSizeRepository } from '@domain/BusinessSizeRepository';
import { BusinessSize, BusinessSizeCreate } from '@domain/BusinessSize';

export class CreateBusinessSizeUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(businessSize: BusinessSizeCreate): Promise<BusinessSize> {
    return await this.repository.create(businessSize);
  }
}
