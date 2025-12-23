import { MccRepository } from '@domain/MccRepository';
import { Mcc, MccUpdate } from '@domain/Mcc';

export class UpdateMccUseCase {
  constructor(private repository: MccRepository) {}

  async execute(id: number, mcc: MccUpdate): Promise<Mcc> {
    return await this.repository.update(id, mcc);
  }
}
