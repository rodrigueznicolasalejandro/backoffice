import { MccViewDto } from "@application/dto/mccView.dto";
import { Mcc } from "@domain/entities/mcc.entity";

export function toMccViewDto(mcc: Mcc): MccViewDto {
    return {
        code: mcc.code,
        description: mcc.description,
        allowsTips: mcc.allowsTips
    };
}
