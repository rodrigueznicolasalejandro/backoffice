import { getMccs } from "@ui/providers/mcc.service";
import { useFetch } from "../../../hooks/useFetch";

export function useGetMcc() {
  const {data, loading, error} = useFetch({fetchFn: getMccs});
    return { mccs: data, loading, error };
}