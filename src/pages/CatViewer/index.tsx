import { useLayoutEffect, useRef, useState } from "react";
import CatListColumn from "./components/CatListColumn";
import ColumnCalculator from "./components/ColumnCalculator";
import { useCatsByColumns, useCatStoreActions } from "@/store/cat";
import axios from "axios";
import { END_POINT } from "@/constants/endpoints";
import { Cat } from "@/types/cat";

import "./cat.css";

function CatViewer() {
  const catsByColumn = useCatsByColumns();
  const { addCats } = useCatStoreActions();
  const scrollEndDivRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useLayoutEffect(
    function fetchCat() {
      (async function fetchCatApi() {
        setIsLoading(true);
        const result = await axios.get<Cat[]>(
          `${END_POINT.CAT_API}/images/search?limit=30&page=${page}`,
          { headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY } }
        );
        setIsLoading(false);
        addCats(result.data);
      })();
    },
    [addCats, page]
  );

  useLayoutEffect(function registerIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            setPage((prev) => prev + 1);
          }
        });
      },
      { rootMargin: "800px" }
    );

    if (scrollEndDivRef.current) {
      observer.observe(scrollEndDivRef.current);
    }

    return () => observer.disconnect();
  });

  return (
    <ColumnCalculator>
      <main className="cat-page">
        <div className="container">
          {catsByColumn.map((catList, columnIdx) => (
            <CatListColumn key={columnIdx} cats={catList} />
          ))}
        </div>
        <div
          ref={scrollEndDivRef}
          style={{ width: "100%", height: "1px", color: "red" }}
        />
      </main>
    </ColumnCalculator>
  );
}

export default CatViewer;
