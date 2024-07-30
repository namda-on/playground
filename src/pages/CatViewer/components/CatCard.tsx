import { memo } from "react";
import { Cat } from "@/types/cat";

interface CatCardProps {
  cat: Cat;
}

function CatCard({ cat }: CatCardProps) {
  return (
    <div className="card">
      <img className="card" src={cat.url} alt={`cat${cat.id}`} />
    </div>
  );
}

export default memo(CatCard);
