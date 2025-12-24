import { MccRepository } from '@domain/ports/repositories/MccRepository';
import { Mcc } from '@domain/entities/Mcc';

export class GetAllMccsUseCase {
  constructor(private repository: MccRepository) {}

  async execute(): Promise<Mcc[]> {
    return await this.repository.getAll();
  }
}
