import React, { FC, useState, useEffect, useContext } from "react";
import CardType from "../types/Card";
import {
  playCard,
  playFinished,
  playMatched,
  playNotMatched,
} from "../utils/playAudio";
import { GameContext } from "./GameProvider";

type CardState = {
  cardsMatched: string[];
  cardOpened: CardType | undefined;
  cardMatch: CardType | undefined;
  cardShake: boolean;
  spyMode: boolean;
  finished: boolean;
  clearState: () => void;
  handlers: {
    newGameHandler: () => void;
    keepPlayingHandler: () => void;
    openCardHandler: (e: any, card: CardType) => void;
    playCardHandler: (e: any, card: CardType) => void;
    spyHandler: () => void;
  };
};

const defaultState: CardState = {
  cardsMatched: [],
  cardOpened: undefined,
  cardMatch: undefined,
  cardShake: false,
  spyMode: false,
  finished: false,
  clearState: () => {},
  handlers: {
    newGameHandler: () => {},
    keepPlayingHandler: () => {},
    openCardHandler: () => {},
    playCardHandler: () => {},
    spyHandler: () => {},
  },
};

export const CardContext = React.createContext(defaultState);

export const CardProvider: FC<{ children?: any }> = (props) => {
  const [cardsMatched, setCardsMatched] = useState<string[]>([]);
  const [cardOpened, setCardOpened] = useState<CardType | undefined>();
  const [cardMatch, setCardMatch] = useState<CardType | undefined>();
  const [cardShake, setCardShake] = useState(false);
  const [spyMode, setSpyMode] = useState(false);
  const [finished, setFinished] = useState(false);
  const gameContext = useContext(GameContext);
  const { cardsSet, handlers: gameHandlers } = gameContext;

  // Keep playing opened card till a match card is opened
  useEffect(() => {
    let playInterval: any;

    if (cardOpened && !cardMatch && !cardsMatched.includes(cardOpened.name)) {
      playInterval = setInterval(() => {
        playCard(cardOpened);
        setCardShake(true);
        setTimeout(() => {
          setCardShake(false);
        }, 500);
      }, 3000);
    }

    return () => {
      clearInterval(playInterval);
    };
  }, [cardOpened, cardMatch]);

  const clearState = () => {
    setCardOpened(undefined);
    setCardMatch(undefined);
    setCardsMatched([]);
    setCardShake(false);
    setSpyMode(false);
    setFinished(false);
  };

  const newGameHandler = () => {
    clearState();
    gameHandlers.startGameHandler();
  };

  const keepPlayingHandler = () => {
    setFinished(false);
  };

  const openCardHandler = (event: any, card: CardType) => {
    if (cardOpened && cardMatch) return false;

    playCard(card);

    // Open Match Card
    if (cardOpened) {
      setCardMatch(card);

      // Matched
      if (card.name === cardOpened.name) {
        setCardsMatched((cardsMatched) => [card.name, ...cardsMatched]);
        setCardOpened(undefined);
        setCardMatch(undefined);
        playMatched();

        // Not Matched
      } else {
        setTimeout(() => {
          setCardShake(true);
        }, 2500);

        setTimeout(() => {
          setCardOpened(undefined);
          setCardMatch(undefined);
          setCardShake(false);
        }, 3000);
        playNotMatched();
      }
    }

    // Open Card
    else {
      setCardOpened(card);

      // Open Last Card
      if (cardsMatched.length === (cardsSet.length - 1) / 2) {
        setCardsMatched((cardsMatched) => [card.name, ...cardsMatched]);
        playMatched();
        setTimeout(() => {
          setFinished(true);
          playFinished();
        }, 2000);
      }
    }
  };

  const playCardHandler = (e: any, card: CardType) => {
    e.stopPropagation();
    if (cardOpened && cardMatch) return false;
    playCard(card);
  };

  const spyHandler = () => {
    if (cardsMatched.length > 0 || cardOpened) return setSpyMode(false);

    if (!spyMode) {
      setSpyMode(true);
    } else {
      setCardShake(true);
      setTimeout(() => {
        setSpyMode(false);
        setCardShake(false);
      }, 500);
    }
  };

  const state = {
    cardsMatched,
    cardOpened,
    cardMatch,
    cardShake,
    spyMode,
    finished,
    clearState,
    handlers: {
      newGameHandler,
      keepPlayingHandler,
      openCardHandler,
      playCardHandler,
      spyHandler,
    },
  };

  return (
    <CardContext.Provider value={state}>{props.children}</CardContext.Provider>
  );
};

export default CardProvider;
