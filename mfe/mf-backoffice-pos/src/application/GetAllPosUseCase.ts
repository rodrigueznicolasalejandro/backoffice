import { PosRepository } from '@domain/PosRepository';
import { Pos } from '@domain/Pos';

export class GetAllPosUseCase {
  constructor(private repository: PosRepository) {}

  async execute(): Promise<Pos[]> {
    return await this.repository.getAll();
  }
}
