import { ProductsRepository } from "@domain/ports/repositories/products.port";

export class GetProductSchemaUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    
    async execute() {
        return await this.productsRepository.getProductSchema();
    }
}
