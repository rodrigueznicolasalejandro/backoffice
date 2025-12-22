import { toProductViewDto } from "@application/mappers/products.mapper";
import { ProductsRepository } from "@domain/ports/repositories/products.port";

export class GetProductsUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    async execute() {
       const products= await this.productsRepository.getProducts();
       return products.map(toProductViewDto)
    }
}
