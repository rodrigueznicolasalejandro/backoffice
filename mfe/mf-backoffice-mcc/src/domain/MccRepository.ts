import { Mcc, MccCreate, MccUpdate } from './Mcc';

export interface MccRepository {
  getAll(): Promise<Mcc[]>;
  getById(id: number): Promise<Mcc>;
  create(mcc: MccCreate): Promise<Mcc>;
  update(id: number, mcc: MccUpdate): Promise<Mcc>;
  delete(id: number): Promise<void>;
}
