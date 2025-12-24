import { BusinessSizeViewDto } from "@application/dto/bussinesSizeView.dto";
import { GetAllBusinessSizesUseCase } from "@application/useCases/businessSize/GetAllBusinessSizesUseCase";
import { HttpBusinessSizeRepository } from "@infrastructure/http/repositories/businessSize.adapter";

const getAllBusinessSizesUseCase = new GetAllBusinessSizesUseCase(new HttpBusinessSizeRepository());

export async function getBusinessSizes(): Promise<BusinessSizeViewDto[]> {
    return await getAllBusinessSizesUseCase.execute();
}