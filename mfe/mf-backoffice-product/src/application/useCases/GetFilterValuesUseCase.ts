import { ProductsRepository } from "@domain/ports/repositories/products.port";

export class GetFilterValuesUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    
    async execute() {
        return await this.productsRepository.getFilterValues();
    }
}
