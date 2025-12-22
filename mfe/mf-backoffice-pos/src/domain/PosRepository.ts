import { Pos } from './Pos';

export interface PosRepository {
  getAll(): Promise<Pos[]>;
  getById(id: string): Promise<Pos | null>;
  create(pos: Pos): Promise<Pos>;
  update(id: string, pos: Partial<Pos>): Promise<Pos>;
  delete(id: string): Promise<boolean>;
}
