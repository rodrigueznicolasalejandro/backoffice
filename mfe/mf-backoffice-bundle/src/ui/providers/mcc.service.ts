import { MccViewDto } from "@application/dto/mccView.dto";
import { GetAllMccsUseCase } from "@application/useCases/mcc/GetAllMccsUseCase";
import { HttpMccRepository } from "@infrastructure/http/repositories/mcc.adapter";


const getAllMccsUseCase = new GetAllMccsUseCase(new HttpMccRepository());

export async function getMccs(): Promise<MccViewDto[]> {
    return await getAllMccsUseCase.execute();
}