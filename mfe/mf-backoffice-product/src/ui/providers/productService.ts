import { GetProductsUseCase, GetProductsUseCaseV1 } from "@application/useCases/getProducts.uc";
import { HttpProductsRepository, HttpProductsRepositoryV1 } from "@infraestructure/http/repositories/products.adapter";
import { ProductViewDto } from "@application/dto/productView.dto";

// const getProductsUseCase = new GetProductsUseCase(new HttpProductsRepository());
const getProductsUseCase = new GetProductsUseCaseV1(new HttpProductsRepositoryV1());

export async function getProducts(): Promise<ProductViewDto[]> {
    return await getProductsUseCase.execute();
}