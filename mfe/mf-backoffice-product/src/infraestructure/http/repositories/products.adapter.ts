import { Product } from "@domain/entities/product.entity";
import { ProductV1 } from "@domain/entities/products.v1.entity";
import { ProductsRepository } from "@domain/ports/repositories/products.port";
import { httpClient } from "@infraestructure/config/httpClient";

export class HttpProductsRepository implements ProductsRepository {
    async getProducts() {
        const {data} = await httpClient.get<Product[]>('/products');
        return data.data;
    }
}

export class HttpProductsRepositoryV1 implements ProductsRepository {
    async getProducts() {
        const {data} = await httpClient.get<ProductV1[]>('/ms-products/api/v1/products');
        return data.data;
    }
}