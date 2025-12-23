import { MccRepository } from '@domain/MccRepository';
import { Mcc, MccCreate } from '@domain/Mcc';

export class CreateMccUseCase {
  constructor(private repository: MccRepository) {}

  async execute(mcc: MccCreate): Promise<Mcc> {
    return await this.repository.create(mcc);
  }
}
