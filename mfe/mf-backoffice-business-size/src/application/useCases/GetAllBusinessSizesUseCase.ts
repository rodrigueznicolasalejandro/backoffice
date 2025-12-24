import { BusinessSizeRepository } from '@domain/ports/repositories/BusinessSizeRepository';
import { BusinessSize } from '@domain/entities/BusinessSize';

export class GetAllBusinessSizesUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(): Promise<BusinessSize[]> {
    return await this.repository.getAll();
  }
}
