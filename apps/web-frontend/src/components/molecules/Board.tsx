import { useAppState } from "@/store";
import tw from "tailwind-styled-components";
import { BoardCard } from ".";
import { Button } from "../ui/button";

const Root = tw.div`
    w-full h-screen bg-indigo-100
    flex justify-center items-center
`;

const Container = tw.div`
    bg-blue-200
    h-full max-h-[600px] w-full max-w-3xl p-3
    space-y-5
`;

function Cards() {
  const { deck } = useAppState(({ deck }) => ({ deck }));

  return (
    <div className="grid gap-5 grid-cols-4">
      {deck.map((card, i) => (
        <BoardCard {...card} index={i} key={i} />
      ))}
    </div>
  );
}

function Toolbar() {
  const { shuffleCards } = useAppState(({ shuffleCards }) => ({
    shuffleCards,
  }));

  return (
    <div className="border-b border-gray-500 pb-3">
      <Button onClick={shuffleCards} variant="destructive">
        Restart
      </Button>
    </div>
  );
}

function Footer() {
  const { attempts } = useAppState(({ attempts }) => ({
    attempts,
  }));

  return (
    <div>
      <div className="space-x-1">
        <span className="font-semibold">Attempts:</span>
        <span>{attempts}</span>
      </div>
    </div>
  );
}

export function Board() {
  return (
    <Root>
      <Container>
        <Toolbar />
        <Cards />
        <Footer />
      </Container>
    </Root>
  );
}
