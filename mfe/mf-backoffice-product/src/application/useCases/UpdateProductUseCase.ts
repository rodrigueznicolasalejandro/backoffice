import { toProductViewDto } from "@application/mappers/products.mapper";
import { ProductsRepository } from "@domain/ports/repositories/products.port";
import { Product } from "@domain/entities/product.entity";

export class UpdateProductUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    
    async execute(id: string, productData: Partial<Product>) {
        const product = await this.productsRepository.updateProduct(id, productData);
        return toProductViewDto(product);
    }
}
