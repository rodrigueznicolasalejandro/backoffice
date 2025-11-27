import { useEffect,useState } from "react";
import { getProducts } from "@ui/providers/productService";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data =  await getProducts();
                setProducts(data);
            }
            catch (err) {
                setError('Error fetching products');
            }
            finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);
    return { products, loading, error };
}