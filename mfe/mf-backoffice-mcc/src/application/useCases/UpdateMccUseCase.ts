import { MccRepository } from '@domain/ports/repositories/MccRepository';
import { Mcc, MccUpdate } from '@domain/entities/Mcc';

export class UpdateMccUseCase {
  constructor(private repository: MccRepository) {}

  async execute(id: number, mcc: MccUpdate): Promise<Mcc> {
    return await this.repository.update(id, mcc);
  }
}
