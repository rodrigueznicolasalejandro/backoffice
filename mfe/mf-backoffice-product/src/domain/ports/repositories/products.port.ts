import { Product } from "@domain/entities/product.entity";
import { ProductV1 } from "@domain/entities/products.v1.entity";

export interface ProductsRepository {
    getProducts(page?: number, limit?: number): Promise<{ products: Product[], pagination: any }>;
}

export interface ProductsRepositoryV1 {
    getProducts(): Promise<ProductV1[]>;
}