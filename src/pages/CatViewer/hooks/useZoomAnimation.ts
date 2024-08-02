import { CLASS } from "@/constants/class";
import { MutableRefObject, useRef } from "react";

type Position = { top: number; left: number; bottom: number; right: number };

export default function useZoomAnimation(
  cardRef: MutableRefObject<HTMLDivElement | null>
) {
  let imageContainer: HTMLDivElement;
  let imageElement: HTMLImageElement;

  const initialPropertyRef = useRef<DOMRect>({} as DOMRect);
  const finalPropertyRef = useRef<DOMRect>({} as DOMRect);
  const cardClip = useRef<Position>({} as Position);

  const initElements = () => {
    imageContainer = cardRef.current!.querySelector(
      `.${CLASS.imageContainer}`
    ) as HTMLDivElement;
    imageElement = cardRef.current!.querySelector("img")!;
  };

  const removeStyles = (isZoomOut = false) => {
    imageElement.removeAttribute("style");
    imageContainer.removeAttribute("style");

    if (isZoomOut) {
      cardRef.current!.removeAttribute("style");
    }
  };

  const setCardHeight = () => {
    const { height } = cardRef.current!.getBoundingClientRect();
    cardRef.current!.style.height = `${height}px`;
  };

  const collectInitialProperties = () => {
    initialPropertyRef.current = imageElement.getBoundingClientRect();
    const cardRect = cardRef.current!.getBoundingClientRect();

    const windowWidthWithoutScroll =
      window.visualViewport?.width ?? window.innerWidth;

    cardClip.current = {
      top: cardRect.top,
      right: windowWidthWithoutScroll - cardRect.right,
      bottom: window.innerHeight - cardRect.bottom,
      left: cardRect.left,
    };
  };

  const collectFinalProperties = () => {
    finalPropertyRef.current = imageElement.getBoundingClientRect();
  };

  const setInvertedTransform = () => {
    const {
      left: initialLeft,
      top: initialTop,
      width: initialWidth,
      height: initialHeight,
    } = initialPropertyRef.current;
    const {
      left: finalLeft,
      top: finalTop,
      width: finalWidth,
      height: finalHeight,
    } = finalPropertyRef.current;

    const left = initialLeft - finalLeft;
    const top = initialTop - finalTop;
    const scale =
      initialWidth > initialHeight
        ? initialWidth / finalWidth
        : initialHeight / finalHeight;

    imageElement.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
  };

  const clipCardContent = () => {
    const { top, right, bottom, left } = cardClip.current;
    imageContainer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round 5px)`;
  };

  const startExpanding = () => {
    imageElement.style.transform = "translate(0, 0) scale(1)";
    imageContainer.style.clipPath = "inset(0)";
  };

  const onExpandTransitionEnd = () => {
    cardRef.current!.classList.remove(CLASS.cardAnimation);
    imageContainer.removeEventListener("transitionend", onExpandTransitionEnd);
    removeStyles();
  };

  const zoomIn = () => {
    if (!cardRef.current) return;
    setCardHeight();
    initElements();

    imageContainer.addEventListener("transitionend", onExpandTransitionEnd);

    collectInitialProperties();
    cardRef.current!.classList.add(CLASS.cardExpanded);
    collectFinalProperties();
    setInvertedTransform();
    clipCardContent();

    requestAnimationFrame(() => {
      cardRef.current!.classList.add(CLASS.cardAnimation);
      startExpanding();
    });
  };

  const setCollapsingInitialStyles = () => {
    imageElement.style.transform = `translate(0, 0) scale(1)`;
    imageContainer.style.clipPath = "inset(0)";
  };

  const startCollapsing = () => {
    setInvertedTransform();
    clipCardContent();
  };

  const onCollapseTransitionEnd = () => {
    cardRef.current!.classList.remove(CLASS.cardAnimation);
    cardRef.current!.classList.remove(CLASS.cardExpanded);

    imageContainer.removeEventListener(
      "transitionend",
      onCollapseTransitionEnd
    );

    removeStyles(true);
  };

  const zoomOut = () => {
    if (!cardRef.current) return;

    imageContainer = cardRef.current.querySelector(
      `.${CLASS.imageContainer}`
    ) as HTMLDivElement;

    imageContainer.addEventListener("transitionend", onCollapseTransitionEnd);

    setCollapsingInitialStyles();

    requestAnimationFrame(() => {
      cardRef.current!.classList.add(CLASS.cardAnimation);
      startCollapsing();
    });
  };

  return { zoomIn, zoomOut };
}
