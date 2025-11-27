import { useEffect, useState } from "react";

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}
interface UseParamsFetch<T>{
    fetchFn: ()=>Promise<T>;
    labelError?: string;
}
export function useFetch<T>({fetchFn}: UseParamsFetch<T>) :UseFetchResult<T>{
    const [data,setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function load() {
            try {
                const result =  await fetchFn();
                if (isMounted) setData(result);                
            }
            catch (err) {
                if (isMounted) setError("Error fetching data");
            }
            finally {
                if (isMounted) setLoading(false);
            }
        }
        load();

        return () => { isMounted = false; }

    }, [fetchFn]);

    return { data, loading, error };
}