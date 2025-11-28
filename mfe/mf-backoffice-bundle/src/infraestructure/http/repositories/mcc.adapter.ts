import { Mcc } from "@domain/entities/mcc.entity";
import { MccRepository } from "@domain/ports/repositories/mcc.port";
import { httpClient } from "@infraestructure/config/httpClient";

export class HttpMccRepository implements MccRepository {
    async getMC() {
        const url='/ms-bundles/api/v1/mcc';
        const {data} = await httpClient.public.get<Mcc[]>(url);
        return data.data;
    }
}