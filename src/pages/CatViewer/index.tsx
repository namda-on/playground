import CatListColumn from "./components/CatListColumn";
import ColumnCalculator from "./components/ColumnCalculator";
import { useCatsByColumns, useCatStoreActions } from "@/store/cat";
import { useLayoutEffect } from "react";
import axios from "axios";
import { END_POINT } from "@/constants/endpoints";
import { Cat } from "@/types/cat";

import "./cat.css";

function CatViewer() {
  const catsByColumn = useCatsByColumns();
  const { addCats } = useCatStoreActions();

  useLayoutEffect(
    function fetchCat() {
      (async function fetchCatApi() {
        const result = await axios.get<Cat[]>(
          `${END_POINT.CAT_API}/images/search?limit=30`,
          { headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY } }
        );
        addCats(result.data);
      })();
    },
    [addCats]
  );

  return (
    <ColumnCalculator>
      <main>
        <div className="container">
          {catsByColumn.map((catList, columnIdx) => (
            <CatListColumn key={columnIdx} cats={catList} />
          ))}
        </div>
      </main>
    </ColumnCalculator>
  );
}

export default CatViewer;
