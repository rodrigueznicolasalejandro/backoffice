import { PosRepository } from '@domain/PosRepository';
import { Pos } from '@domain/Pos';
import { PosUpdateDto } from './dto/pos.dto';

export class UpdatePosUseCase {
  constructor(private repository: PosRepository) {}

  async execute(id: string, data: PosUpdateDto): Promise<Pos> {
    return await this.repository.update(id, data);
  }
}
