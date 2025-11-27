import { BusinessSizeViewDto } from "@application/dto/bussinesSizeView.dto";
import { GetBusinessSizeUseCase } from "@application/useCases/businessSize/getBusinessSize.uc";
import { HttpBusinessSizeRepository } from "@infraestructure/http/repositories/businessSize.adapter";

const getBusinessSizeUseCase = new GetBusinessSizeUseCase(new HttpBusinessSizeRepository());

export async function getBusinessSizes(): Promise<BusinessSizeViewDto[]> {
    return await getBusinessSizeUseCase.execute();
}