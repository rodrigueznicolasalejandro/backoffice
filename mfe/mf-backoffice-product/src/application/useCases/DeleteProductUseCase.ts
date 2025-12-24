import { ProductsRepository } from "@domain/ports/repositories/products.port";

export class DeleteProductUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    
    async execute(id: string): Promise<void> {
        await this.productsRepository.deleteProduct(id);
    }
}
