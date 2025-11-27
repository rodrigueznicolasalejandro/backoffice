import { Product } from "@domain/entities/product.entity";
import { ProductV1 } from "@domain/entities/products.v1.entity";

export interface ProductsRepository {
    getProducts(): Promise<Product[]>;
}

export interface ProductsRepositoryV1 {
    getProducts(): Promise<ProductV1[]>;
}