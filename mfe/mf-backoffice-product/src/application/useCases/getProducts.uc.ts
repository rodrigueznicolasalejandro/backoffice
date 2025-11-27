import { toProductViewDto, toProductViewDtoV1 } from "@application/mappers/products.mapper";
import { ProductsRepository, ProductsRepositoryV1 } from "@domain/ports/repositories/products.port";

export class GetProductsUseCase {
    constructor(private productsRepository: ProductsRepository) {}
    async execute() {
       const products= await this.productsRepository.getProducts();
       return products.map(toProductViewDto)
    }
}

export class GetProductsUseCaseV1 {
    constructor(private productsRepository: ProductsRepositoryV1) {}
    async execute() {
       const products= await this.productsRepository.getProducts();
       return products.map(toProductViewDtoV1)
    }
}