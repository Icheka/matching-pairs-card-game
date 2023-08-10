import tw from "tailwind-styled-components";
import { RenderedCard } from "../organisms/Game/types";
import { useAppState } from "@/store";
import { useCallback, useMemo, useState } from "react";
import { clsx } from "clsx";

const Card = tw.div`
    board-card
    h-32 w-32
    rounded-sm shadow-md
    bg-white
    transition-all duration-300
    flex justify-center items-center object-cover
    overflow-hidden
    relative
`;

export function BoardCard({
  src,
  index,
  matched,
}: RenderedCard & { index: number }) {
  const { choices, onCardSelected, showAllCards } = useAppState(
    ({ choices, onCardSelected, showAllCards }) => ({ choices, onCardSelected, showAllCards })
  );
  const [overrideFlip, setOverrideFlip] = useState(false);

  const flipped = useMemo(
    () => showAllCards || overrideFlip || matched || choices.includes(index),
    [showAllCards, overrideFlip, matched, choices, index]
  );

  const handleClick = useCallback(() => {
    const isPositiveMatch = onCardSelected(index);

    if (!isPositiveMatch) {
      setOverrideFlip(true);

      setTimeout(() => {
        setOverrideFlip(false);
      }, 500); // TODO: make this level-dependent
    }
  }, [index, onCardSelected]);

  return (
    <Card
      className={clsx({
        flipped,
      })}
      onClick={handleClick}
    >
      <img src="/img/cover.png" alt={"card is hidden"} />
      <img src={src} alt={`card #${index}`} />
    </Card>
  );
}
