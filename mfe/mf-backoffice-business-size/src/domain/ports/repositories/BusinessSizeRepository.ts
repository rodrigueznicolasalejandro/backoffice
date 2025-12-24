import { BusinessSize, BusinessSizeCreate, BusinessSizeUpdate } from '../../entities/BusinessSize';

export interface BusinessSizeRepository {
  getAll(): Promise<BusinessSize[]>;
  getById(id: number): Promise<BusinessSize>;
  create(businessSize: BusinessSizeCreate): Promise<BusinessSize>;
  update(id: number, businessSize: BusinessSizeUpdate): Promise<BusinessSize>;
  delete(id: number): Promise<void>;
}
