import { useCatsByColumns } from "@/store/cat";
import CatListColumn from "./CatListColumn";
import { memo } from "react";

function CatListContainer() {
  const catsByColumn = useCatsByColumns();

  return (
    <div className="container">
      {catsByColumn.map((catList, columnIdx) => (
        <CatListColumn key={columnIdx} cats={catList} />
      ))}
    </div>
  );
}

export default memo(CatListContainer);
