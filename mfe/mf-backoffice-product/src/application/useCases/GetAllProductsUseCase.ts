import { toProductViewDto } from "@application/mappers/products.mapper";
import { ProductsRepository } from "@domain/ports/repositories/products.port";

export class GetAllProductsUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    
    async execute(page: number = 1, limit: number = 10) {
        const response = await this.productsRepository.getProducts(page, limit);
        return {
            products: response.products.map(toProductViewDto),
            pagination: response.pagination
        };
    }
}
