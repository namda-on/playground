import { memo, useCallback, useRef } from "react";
import { Cat } from "@/types/cat";

interface CatCardProps {
  cat: Cat;
}

const EXPANDED_CLASS = "card-expanded";

function CatCard({ cat }: CatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onClickCard = useCallback(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;
    if (cardElement.classList.contains(EXPANDED_CLASS)) {
      cardElement.style.removeProperty("height");
      cardElement.classList.remove(EXPANDED_CLASS);
    } else {
      const { height } = cardElement.getBoundingClientRect();
      cardElement.style.height = `${height}px`;

      cardElement.classList.add(EXPANDED_CLASS);
    }
  }, []);

  return (
    <div ref={cardRef} className="card" onClick={onClickCard}>
      <div className="image-container">
        <img
          ref={imgRef}
          className="card"
          width={cat.width}
          height={cat.height}
          src={cat.url}
          alt={`cat${cat.id}`}
        />
      </div>
    </div>
  );
}

export default memo(CatCard);
