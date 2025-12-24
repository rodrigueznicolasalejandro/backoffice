import { PosRepository } from '@domain/ports/repositories/PosRepository';
import { Pos } from '@domain/entities/Pos';

export class GetPosByIdUseCase {
  constructor(private repository: PosRepository) {}

  async execute(id: string): Promise<Pos | null> {
    return await this.repository.getById(id);
  }
}
