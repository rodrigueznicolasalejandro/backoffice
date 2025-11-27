import { toMccViewDto } from "@application/mappers/mcc.mapper";
import { MccRepository } from "@domain/ports/repositories/mcc.port";

export class GetMccUseCase {
    constructor(private mccRepository: MccRepository) {}
    async execute() {
       const products= await this.mccRepository.getMC();
       return products.map(toMccViewDto)
    }
}
