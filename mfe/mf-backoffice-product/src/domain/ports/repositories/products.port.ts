import { Product } from "@domain/entities/product.entity";
import { ProductV1 } from "@domain/entities/products.v1.entity";

export interface ProductsRepository {
    getProducts(page?: number, limit?: number): Promise<{ products: Product[], pagination: any }>;
    getProduct(id: string): Promise<Product>;
    createProduct(product: Partial<Product>): Promise<Product>;
    updateProduct(id: string, product: Partial<Product>): Promise<Product>;
    patchProduct(id: string, product: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
    getFilterValues(): Promise<any>;
    getProductSchema(): Promise<any>;
}

export interface ProductsRepositoryV1 {
    getProducts(): Promise<ProductV1[]>;
}