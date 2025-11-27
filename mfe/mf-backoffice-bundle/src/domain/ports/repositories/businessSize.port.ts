import { BusinessSize } from "@domain/entities/businessSize.entity";

export interface BussinesSizeRepository {
    getBusinessSizes(): Promise<BusinessSize[]>;
}
