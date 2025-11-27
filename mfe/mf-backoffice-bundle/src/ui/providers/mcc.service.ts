import { MccViewDto } from "@application/dto/mccView.dto";
import { GetMccUseCase } from "@application/useCases/mcc/getMccSize.uc";
import { HttpMccRepository } from "@infraestructure/http/repositories/mcc.adapter";


const getMccUseCase = new GetMccUseCase(new HttpMccRepository());

export async function getMccs(): Promise<MccViewDto[]> {
    return await getMccUseCase.execute();
}