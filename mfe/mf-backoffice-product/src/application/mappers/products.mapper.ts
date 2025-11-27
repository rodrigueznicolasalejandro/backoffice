import { Product } from "@domain/entities/product.entity";
import { ProductViewDto } from "../dto/productView.dto";
import { ProductV1 } from "@domain/entities/products.v1.entity";

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

export function toProductViewDtoV1(product: ProductV1): ProductViewDto {
    return {
        id: product.id,
        name: product.name,
        brand: { id: 0, name: product.brand },
        paymentMethod: { id: 0, name: product.paymentMethod },
        paymentType: { id: 0, name: product.paymentType },
        currency: { id: 0, code: product.currency },
        financingType: { id: 0, name: product.financeType },
        cardScope: { id: 0, name: product.cardScope },
        captureMethod: { id: 0, name: product.captureMethod },
    };
}