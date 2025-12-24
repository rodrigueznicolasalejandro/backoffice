import { toProductViewDto } from "@application/mappers/products.mapper";
import { ProductsRepository } from "@domain/ports/repositories/products.port";

export class GetProductByIdUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    
    async execute(id: string) {
        const product = await this.productsRepository.getProduct(id);
        return toProductViewDto(product);
    }
}
