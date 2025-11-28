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
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data,setData] = useState<T | null>(null);
    
    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        let isMounted = true;

        async function load() {
            try {
                const result =  await fetchFn();
                if (isMounted) setData(result);                
            }
            catch (err) {
                if(err.name === 'AbortError') return;
                if (isMounted) setError("Error fetching data");
            }
            finally {
                if (isMounted) setLoading(false);
            }
        }
        load();

        return () => { isMounted = false; controller.abort(); };

    }, [fetchFn]);

    return { data, loading, error };
}