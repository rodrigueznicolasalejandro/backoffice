import { Mcc } from "@domain/entities/mcc.entity";

export interface MccRepository {
    getMC(): Promise<Mcc[]>;
}
