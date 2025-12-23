import { Product } from "@domain/entities/product.entity";
import { ProductV1 } from "@domain/entities/products.v1.entity";
import { ProductsRepository, ProductsRepositoryV1 } from "@domain/ports/repositories/products.port";
import { httpClient } from "@infraestructure/config/httpClient";

export class HttpProductsRepository implements ProductsRepository {
    async getProducts(page: number = 1, limit: number = 10) {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        const {data} = await httpClient.get<{ data: { products: Product[], pagination: any } }>(`/products?${params.toString()}`);
        return data.data;
    }
    
    async getProduct(id: string) {
        const {data} = await httpClient.get<{ data: { product: Product } }>(`/products/${id}`);
        return data.data.product;
    }
    
    async createProduct(product: Partial<Product>) {
        const {data} = await httpClient.post<{ data: { product: Product } }>('/products', product);
        return data.data.product;
    }
    
    async updateProduct(id: string, product: Partial<Product>) {
        const {data} = await httpClient.put<{ data: { product: Product } }>(`/products/${id}`, product);
        return data.data.product;
    }
    
    async deleteProduct(id: string) {
        const {data} = await httpClient.delete<{ data: { product: Product } }>(`/products/${id}`);
        return data.data.product;
    }
}

export class HttpProductsRepositoryV1 implements ProductsRepositoryV1 {
    async getProducts() {
        const {data} = await httpClient.get<{ data: { products: ProductV1[] } }>('/products');
        return data.data.products;
    }
}