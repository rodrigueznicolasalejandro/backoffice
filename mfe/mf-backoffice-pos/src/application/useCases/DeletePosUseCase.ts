import { PosRepository } from '@domain/ports/repositories/PosRepository';

export class DeletePosUseCase {
  constructor(private repository: PosRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
