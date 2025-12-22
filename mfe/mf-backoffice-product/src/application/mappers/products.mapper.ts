import { Product } from "@domain/entities/product.entity";
import { ProductViewDto } from "../dto/productView.dto";

export function toProductViewDto(product: Product): ProductViewDto {
    return {
        id: product.id,
        name: product.code,
        brand: product.brand,
        paymentMethod: product.payment_method,
        paymentType: product.payment_type,
        currency: product.currency,
        financingType: product.financing_type,
        cardScope: product.card_scope,
        captureMethod: product.capture_method
    };
}
