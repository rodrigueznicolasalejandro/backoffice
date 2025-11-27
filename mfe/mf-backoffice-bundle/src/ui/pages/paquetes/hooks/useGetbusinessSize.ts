import { useFetch } from "../../../hooks/useFetch";
import { getBusinessSizes } from "@ui/providers/businessSize.service";

export function useGetBusinessSize() {
  const {data, loading, error} = useFetch({fetchFn: getBusinessSizes});
      return { businessSizes: data, loading, error };
}