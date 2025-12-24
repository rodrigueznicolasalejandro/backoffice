import { BusinessSize } from "@domain/entities/businessSize.entity";
import { BussinesSizeRepository } from "@domain/ports/repositories/businessSize.port";
import { httpClient } from "@infrastructure/config/httpClient";

export class HttpBusinessSizeRepository implements BussinesSizeRepository {
    async getBusinessSizes() {
        const url='/v1/business-sizes';
        const {data} = await httpClient.public.get<BusinessSize[]>(url);
        return data;
    }
}