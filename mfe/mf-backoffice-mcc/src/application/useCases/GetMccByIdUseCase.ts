import { MccRepository } from '@domain/ports/repositories/MccRepository';
import { Mcc } from '@domain/entities/Mcc';

export class GetMccByIdUseCase {
  constructor(private repository: MccRepository) {}

  async execute(id: number): Promise<Mcc> {
    return await this.repository.getById(id);
  }
}
