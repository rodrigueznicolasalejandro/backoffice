import { MccRepository } from '@domain/MccRepository';
import { Mcc } from '@domain/Mcc';

export class GetAllMccsUseCase {
  constructor(private repository: MccRepository) {}

  async execute(): Promise<Mcc[]> {
    return await this.repository.getAll();
  }
}
