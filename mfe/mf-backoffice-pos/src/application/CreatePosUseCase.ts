import { PosRepository } from '@domain/PosRepository';
import { Pos } from '@domain/Pos';
import { PosCreateDto } from './dto/pos.dto';

export class CreatePosUseCase {
  constructor(private repository: PosRepository) {}

  async execute(data: PosCreateDto): Promise<Pos> {
    return await this.repository.create(data);
  }
}
