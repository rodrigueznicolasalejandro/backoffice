import { MccRepository } from '@domain/MccRepository';
import { Mcc } from '@domain/Mcc';

export class GetMccByIdUseCase {
  constructor(private repository: MccRepository) {}

  async execute(id: number): Promise<Mcc> {
    return await this.repository.getById(id);
  }
}
