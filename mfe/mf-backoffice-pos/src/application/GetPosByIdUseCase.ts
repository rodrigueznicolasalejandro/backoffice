import { PosRepository } from '@domain/PosRepository';
import { Pos } from '@domain/Pos';

export class GetPosByIdUseCase {
  constructor(private repository: PosRepository) {}

  async execute(id: string): Promise<Pos | null> {
    return await this.repository.getById(id);
  }
}
