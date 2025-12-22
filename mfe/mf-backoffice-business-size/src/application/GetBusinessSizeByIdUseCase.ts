import { BusinessSizeRepository } from '@domain/BusinessSizeRepository';
import { BusinessSize } from '@domain/BusinessSize';

export class GetBusinessSizeByIdUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(id: number): Promise<BusinessSize> {
    return await this.repository.getById(id);
  }
}
