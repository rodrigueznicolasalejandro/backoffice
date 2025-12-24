import { BusinessSizeRepository } from '@domain/ports/repositories/BusinessSizeRepository';
import { BusinessSize } from '@domain/entities/BusinessSize';

export class GetBusinessSizeByIdUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(id: number): Promise<BusinessSize> {
    return await this.repository.getById(id);
  }
}
