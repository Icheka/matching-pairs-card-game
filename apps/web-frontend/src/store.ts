import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { Level, cards, levels } from "./levels";
import { fisherYatesShuffle } from "./utils/randomisation";
import { RenderedCard } from "./components/organisms/Game/types";
import { devOnlyConsole } from "./utils/env";

interface AppState {
  currentLevel: Level;
  deck: Array<RenderedCard>;
  choices: Array<number>;
  cardsGroupedById: Record<string, Array<number>>; // map image URLs to counts
  showAllCards: boolean;
  attempts: number;

  shuffleCards: () => void;
  onCardSelected: (index: number) => boolean;
  temporarilyShowAllCards: () => void;
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        currentLevel: levels[0],
        deck: [] as AppState["deck"],
        choices: [] as AppState["choices"],
        cardsGroupedById: {},
        showAllCards: false,
        attempts: 0,

        shuffleCards() {
          const shuffledCards = fisherYatesShuffle([...cards, ...cards]);
          const deck: Array<RenderedCard> = shuffledCards.map((card) => ({
            ...card,
            matched: false,
          }));

          set((s) => ({
            ...s,
            deck,
            choices: [],
            attempts: 0,
            cardsGroupedById: deck.reduce(
              (prev, curr, i) => ({
                ...prev,
                [curr.src]: [...(prev[curr.src] ?? []), i],
              }),
              {} as AppState["cardsGroupedById"]
            ),
          }));
          get().temporarilyShowAllCards();
        },

        onCardSelected(index) {
          const { choices, deck, cardsGroupedById } = get();
          if (choices.includes(index)) return true;

          const newChoices = [...choices, index];

          const src = deck[newChoices.length > 0 ? newChoices[0] : index].src;
          const ids = cardsGroupedById[src];
          devOnlyConsole.log({ ...get(), choices: newChoices, ids, src });

          function handleWrongCardPicked() {
            set((s) => ({ ...s, choices: [], attempts: s.attempts + 1 }));
          }

          if (newChoices.length < ids.length) {
            // incomplete set
            if (newChoices.find((id) => !ids.includes(id))) {
              // wrong card picked
              handleWrongCardPicked();
              return false;
            }

            set((s) => ({ ...s, choices: newChoices }));
            return true;
          }

          if (newChoices.find((id) => !ids.includes(id))) {
            // wrong card picked
            handleWrongCardPicked();
            return false;
          }

          set((s) => ({
            ...s,
            choices: [],
            deck: deck.map((card) => ({
              ...card,
              matched: card.matched || card.src === src,
            })),
          }));
          return true;
        },

        temporarilyShowAllCards() {
          set((s) => ({ ...s, showAllCards: true }));
          setTimeout(() => {
            set((s) => ({ ...s, showAllCards: false }));
          }, 3000); // TODO: make this level-dependent
        },
      }),
      {
        name: "mp-app-state",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
