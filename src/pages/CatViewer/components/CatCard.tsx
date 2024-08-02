import { memo, useCallback, useRef } from "react";
import { Cat } from "@/types/cat";
import { CLASS } from "@/constants/class";
import useZoomAnimation from "../hooks/useZoomAnimation";

interface CatCardProps {
  cat: Cat;
}

function CatCard({ cat }: CatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { zoomIn, zoomOut } = useZoomAnimation(cardRef);

  const onClickCard = useCallback(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;
    if (cardElement.classList.contains(CLASS.cardExpanded)) return zoomOut();
    zoomIn();
  }, [zoomIn, zoomOut]);

  return (
    <div ref={cardRef} className="card" onClick={onClickCard}>
      <div ref={imageContainerRef} className={`image-container `}>
        <img
          className={CLASS.animatable}
          ref={imgRef}
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
