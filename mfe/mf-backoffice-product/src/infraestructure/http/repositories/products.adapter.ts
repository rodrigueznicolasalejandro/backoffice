import { Product } from "@domain/entities/product.entity";
import { ProductV1 } from "@domain/entities/products.v1.entity";
import { ProductsRepository } from "@domain/ports/repositories/products.port";
import { httpClient } from "@infraestructure/config/httpClient";
// @ts-ignore
import mockProducts from "@infraestructure/http/mock/products.json";
import mockProductsV1 from "@infraestructure/http/mock/products_v1.json";

export class HttpProductsRepository implements ProductsRepository {
    async getProducts() {
        // Si estás en desarrollo, retorna el mock
        if (process.env.NODE_ENV === 'development') {
            return mockProducts as Product[];
        }
        // Real request en producción
        const {data} = await httpClient.get<Product[]>('/products');
        return data;
    }
}

export class HttpProductsRepositoryV1 implements ProductsRepository {
    async getProducts() {
        // Si estás en desarrollo, retorna el mock
        if (process.env.NODE_ENV === 'development') {
            return mockProductsV1 as ProductV1[];
        }
        // Real request en producción
        const {data} = await httpClient.get<ProductV1[]>('/products');
        return data;
    }
}