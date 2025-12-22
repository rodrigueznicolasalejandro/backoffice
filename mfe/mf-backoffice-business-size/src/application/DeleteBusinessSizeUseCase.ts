import { BusinessSizeRepository } from '@domain/BusinessSizeRepository';

export class DeleteBusinessSizeUseCase {
  constructor(private repository: BusinessSizeRepository) {}

  async execute(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
