import { Board } from "@/components/molecules";
import { useAppState } from "@/store";
import { useEffect } from "react";
import tw from "tailwind-styled-components";

const Container = tw.div`
    h-screen
`;

function Game() {
  const { deck, shuffleCards } = useAppState(({ shuffleCards, deck }) => ({
    deck,
    shuffleCards,
  }));

  useEffect(() => {
    if (!deck.length) shuffleCards();
  }, [deck.length, shuffleCards]);

  return (
    <Container>
      <Board />
    </Container>
  );
}

export default Game;
