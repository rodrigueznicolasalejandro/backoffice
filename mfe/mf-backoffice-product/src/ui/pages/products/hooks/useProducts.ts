import { useEffect, useState } from "react";
import { getProducts } from "@ui/providers/productService";

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
}

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10
    });

    const fetchProducts = async (page: number = 1) => {
        setLoading(true);
        try {
            const response = await getProducts(page, 10);
            setProducts(response.products);
            setPagination(response.pagination);
            setCurrentPage(page);
        }
        catch (err) {
            setError('Error fetching products');
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(1);
    }, []);

    const handlePageChange = (page: number) => {
        fetchProducts(page);
    };

    return { 
        products, 
        loading, 
        error, 
        pagination,
        currentPage,
        handlePageChange
    };
}