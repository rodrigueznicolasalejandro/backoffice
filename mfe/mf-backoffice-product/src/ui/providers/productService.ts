import { GetProductsUseCase } from "@application/useCases/getProducts.uc";
import { HttpProductsRepository } from "@infraestructure/http/repositories/products.adapter";
import { ProductViewDto } from "@application/dto/productView.dto";

// const getProductsUseCase = new GetProductsUseCase(new HttpProductsRepository());
const getProductsUseCase = new GetProductsUseCase(new HttpProductsRepository());

export async function getProducts(page: number = 1, limit: number = 10): Promise<{ products: ProductViewDto[], pagination: any }> {
    return await getProductsUseCase.execute(page, limit);
}

// Helper para obtener headers con JWT
const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt_token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// Crear producto
export async function createProduct(productData: any) {
    const response = await fetch('http://localhost:3000/api/v1/products', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
        // Si hay detalles de validación, incluirlos en el mensaje
        if (result.details && Array.isArray(result.details)) {
            throw new Error(`${result.error}: ${result.details.join(', ')}`);
        }
        throw new Error(result.error || result.message || `Error ${response.status}: ${response.statusText}`);
    }
    
    return result;
}

// Obtener producto por ID
export async function getProduct(id: string | number) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    return result.data.product;
}

// Actualizar producto
export async function updateProduct(id: string | number, productData: any) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
}

// Eliminar producto
export async function deleteProduct(id: string | number) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || result.message || `Error ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
}