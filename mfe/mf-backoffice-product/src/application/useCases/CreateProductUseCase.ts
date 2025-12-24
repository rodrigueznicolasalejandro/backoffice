import { toProductViewDto } from "@application/mappers/products.mapper";
import { ProductsRepository } from "@domain/ports/repositories/products.port";
import { Product } from "@domain/entities/product.entity";

export class CreateProductUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    
    async execute(productData: Partial<Product>) {
        const product = await this.productsRepository.createProduct(productData);
        return toProductViewDto(product);
    }
}
