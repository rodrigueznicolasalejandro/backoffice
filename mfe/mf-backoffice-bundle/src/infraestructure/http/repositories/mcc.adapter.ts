import { Mcc } from "@domain/entities/mcc.entity";
import { MccRepository } from "@domain/ports/repositories/mcc.port";
import { httpClient } from "@infraestructure/config/httpClient";
import  mockMcc  from "@infraestructure/http/mock/mcc.json";

export class HttpMccRepository implements MccRepository {
    async getMC() {
        // Si estás en desarrollo, retorna el mock
        if (process.env.NODE_ENV === 'development') {
            return mockMcc.data as Mcc[];
        }
        
        const url='/ms-bundles/api/v1/mcc';
        const {data} = await httpClient.public.get<Mcc[]>(url);
        return data;
    }
}