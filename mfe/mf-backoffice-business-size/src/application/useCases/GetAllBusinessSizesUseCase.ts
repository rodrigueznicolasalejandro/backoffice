import { BusinessSizeRepository } from '@domain/BusinessSizeRepository';
import { BusinessSize } from '@domain/BusinessSize';

export class GetAllBusinessSizesUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(): Promise<BusinessSize[]> {
    return await this.repository.getAll();
  }
}
