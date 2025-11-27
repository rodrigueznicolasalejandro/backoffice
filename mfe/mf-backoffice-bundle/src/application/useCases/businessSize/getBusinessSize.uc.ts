import { toBusinessSizeViewDto } from "@application/mappers/businessSize.mapper";
import { BussinesSizeRepository } from "@domain/ports/repositories/businessSize.port";

export class GetBusinessSizeUseCase {
    constructor(private businessSizeRepository: BussinesSizeRepository) {}
    async execute() {
       const businessSizes = await this.businessSizeRepository.getBusinessSizes();
       return businessSizes.map(toBusinessSizeViewDto)
    }
}
