import { BusinessSizeRepository } from '@domain/ports/repositories/BusinessSizeRepository';
import { BusinessSize, BusinessSizeCreate } from '@domain/entities/BusinessSize';

export class CreateBusinessSizeUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(businessSize: BusinessSizeCreate): Promise<BusinessSize> {
    return await this.repository.create(businessSize);
  }
}
