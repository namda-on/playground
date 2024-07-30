import CatListColumn from "./components/CatListColumn";
import ColumnCalculator from "./components/ColumnCalculator";
import { useCatsByColumns } from "@/store/cat";
import "./cat.css";

function CatViewer() {
  const catsByColumn = useCatsByColumns();

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
