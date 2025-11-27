import { BusinessSize } from "@domain/entities/businessSize.entity";
import { BussinesSizeRepository } from "@domain/ports/repositories/businessSize.port";
import { httpClient } from "@infraestructure/config/httpClient";
import  mockBusinessSize  from "@infraestructure/http/mock/businessSize.json";

export class HttpBusinessSizeRepository implements BussinesSizeRepository {
    async getBusinessSizes() {
        // Si estás en desarrollo, retorna el mock
        if (process.env.NODE_ENV === 'development') {
            return mockBusinessSize.data as BusinessSize[];
        }
 
        const url='/ms-bundles/api/v1/business-sizes';
        const {data} = await httpClient.public.get<BusinessSize[]>(url);
        return data;
    }
}