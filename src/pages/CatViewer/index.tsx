import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ColumnCalculator from "./components/ColumnCalculator";
import { useCatStoreActions } from "@/store/cat";

import "./cat.css";
import CatListContainer from "./components/CatListContainer";
import LoadingIndicator from "./components/LoadingIndicator";
import useGetCats from "./hooks/useGetCats";
import FetchErrorIndicator from "./components/FetchErrorIndicator";

function CatViewer() {
  const scrollEndDivRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const { addCats } = useCatStoreActions();
  const { isLoading, hasError, fetchCats, resetError } = useGetCats();

  const fetchCatAndAdd = useCallback(
    async (page: number) => {
      const cats = await fetchCats(page);
      if (cats) {
        addCats(cats);
      }
    },
    [fetchCats, addCats]
  );

  const refetch = useCallback(
    async (page: number) => {
      resetError();
      fetchCatAndAdd(page);
    },
    [resetError, fetchCatAndAdd]
  );

  useLayoutEffect(
    function fetchCatByPage() {
      fetchCatAndAdd(page);
    },
    [page, fetchCatAndAdd]
  );

  useLayoutEffect(function registerIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading && !hasError) {
            setPage((prev) => prev + 1);
          }
        });
      },
      { rootMargin: "600px" }
    );

    if (scrollEndDivRef.current) {
      observer.observe(scrollEndDivRef.current);
    }

    return () => observer.disconnect();
  });

  return (
    <ColumnCalculator>
      <main className="cat-page">
        <CatListContainer />
        {isLoading && <LoadingIndicator />}
        {hasError && <FetchErrorIndicator refetch={() => refetch(page)} />}
        <div ref={scrollEndDivRef} style={{ width: "100%", height: "2px" }} />
      </main>
    </ColumnCalculator>
  );
}

export default CatViewer;
