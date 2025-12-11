import { Mcc } from "@domain/entities/mcc.entity";
import { MccRepository } from "@domain/ports/repositories/mcc.port";
import { httpClient } from "@infraestructure/config/httpClient";

export class HttpMccRepository implements MccRepository {
    async getMC() {
        const url='/v1/merchant-categories';
        const {data} = await httpClient.public.get<Mcc[]>(url);
        return data.content;
    }
}