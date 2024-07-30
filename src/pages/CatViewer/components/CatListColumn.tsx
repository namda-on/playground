import { Cat } from "@/types/cat";
import CatCard from "./CatCard";

interface CatListColumnProps {
  cats: Cat[];
}

export default function CatListColumn({ cats }: CatListColumnProps) {
  return (
    <div className="column">
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
}
