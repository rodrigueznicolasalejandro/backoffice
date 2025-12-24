import { PosRepository } from '@domain/ports/repositories/PosRepository';
import { Pos } from '@domain/entities/Pos';

export class GetAllPosUseCase {
  constructor(private repository: PosRepository) {}

  async execute(): Promise<Pos[]> {
    return await this.repository.getAll();
  }
}
