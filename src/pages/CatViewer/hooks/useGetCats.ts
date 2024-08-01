import { END_POINT } from "@/constants/endpoints";
import { Cat } from "@/types/cat";
import axios from "axios";
import { useCallback, useState } from "react";

export default function useGetCats() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const resetError = useCallback(() => setHasError(false), [setHasError]);

  const fetchCats = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const result = await axios.get<Cat[]>(
          `${END_POINT.CAT_API}/images/search?limit=30&page=${page}`,
          { headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY } }
        );

        setHasError(false);
        return result.data;
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setHasError]
  );

  return { fetchCats, isLoading, hasError, resetError };
}
