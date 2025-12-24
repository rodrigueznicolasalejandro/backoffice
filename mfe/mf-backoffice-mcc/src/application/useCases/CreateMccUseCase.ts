import { MccRepository } from '@domain/ports/repositories/MccRepository';
import { Mcc, MccCreate } from '@domain/entities/Mcc';

export class CreateMccUseCase {
  constructor(private repository: MccRepository) {}

  async execute(mcc: MccCreate): Promise<Mcc> {
    return await this.repository.create(mcc);
  }
}
