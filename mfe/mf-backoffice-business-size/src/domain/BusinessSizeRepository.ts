import { BusinessSize, BusinessSizeCreate, BusinessSizeUpdate } from './BusinessSize';

export interface BusinessSizeRepository {
  getAll(): Promise<BusinessSize[]>;
  getById(id: number): Promise<BusinessSize>;
  create(businessSize: BusinessSizeCreate): Promise<BusinessSize>;
  update(id: number, businessSize: BusinessSizeUpdate): Promise<BusinessSize>;
  delete(id: number): Promise<void>;
}
