import { MccRepository } from '@domain/MccRepository';

export class DeleteMccUseCase {
  constructor(private repository: MccRepository) {}

  async execute(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
