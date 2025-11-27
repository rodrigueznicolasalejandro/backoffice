import { BusinessSizeViewDto } from "@application/dto/bussinesSizeView.dto";
import { BusinessSize } from "@domain/entities/businessSize.entity";

export function toBusinessSizeViewDto(businessSize: BusinessSize): BusinessSizeViewDto {
    return {
        id: businessSize.id,
        name: businessSize.name,
        isActive: businessSize.isActive
    };
}
