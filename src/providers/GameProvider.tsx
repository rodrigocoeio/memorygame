import React, { FC, useState, useEffect, useContext } from "react";
import loadCardsSet from "../utils/loadCardsSet";
import CardType from "../types/Card";
import CategoryType from "../types/Category";

type DIFFICULTY = "EASY" | "NORMAL" | "HARD";
type GameState = {
  started: boolean;
  difficulty: DIFFICULTY;
  category: string;
  categories: CategoryType[];
  cardsSet: CardType[];
  pleaseSelectCategory: boolean;
  handlers: {
    startGameHandler: () => void;
    quitGameHandler: () => void;
    selectDifficultyHandler: (difficulty: DIFFICULTY) => void;
    selectCategoryHandler: (category: string) => void;
  };
};

const defaultState: GameState = {
  started: false,
  difficulty: "NORMAL",
  category: "",
  categories: [],
  cardsSet: [],
  pleaseSelectCategory: false,
  handlers: {
    startGameHandler() {},
    quitGameHandler() {},
    selectDifficultyHandler() {},
    selectCategoryHandler() {},
  },
};

export const GameContext = React.createContext(defaultState);

export const GameProvider: FC<{ children?: any }> = (props) => {
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<DIFFICULTY>("NORMAL");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState("");
  const [cardsSet, setCardsSet] = useState<CardType[]>([]);
  const [pleaseSelectCategory, setPleaseSelectCategory] = useState(false);

  // Load Categories
  useEffect(() => {
    const loadCategories = async () => {
      const fetchJson = await fetch("/cards/categories.json");
      const categoriesJson = await fetchJson.json();

      let categories: CategoryType[] = [];

      for (const i in categoriesJson) {
        categories.push(categoriesJson[i]);
      }

      setCategories(categories);
    };

    loadCategories();
  }, []);

  const startGameHandler = () => {
    const categoryObj: CategoryType | undefined = categories.find(
      (cat) => cat.name === category
    );

    if (categoryObj) {
      const cardsNumber: any = { EASY: 9, NORMAL: 15, HARD: 25 };
      const cardsSet: CardType[] = loadCardsSet(
        categoryObj,
        cardsNumber[difficulty]
      );

      setCardsSet(cardsSet);
      setStarted(true);

      console.log("Game Started: " + difficulty + " " + category);
    } else {
      setPleaseSelectCategory(true);
    }
  };

  const quitGameHandler = () => {
    setStarted(false);
  };

  const selectDifficultyHandler = (difficulty: DIFFICULTY) => {
    setDifficulty(difficulty);
  };

  const selectCategoryHandler = (category: string) => {
    setCategory(category);
    setPleaseSelectCategory(false);
  };

  const state = {
    started,
    difficulty,
    category,
    categories,
    cardsSet,
    pleaseSelectCategory,
    handlers: {
      startGameHandler,
      quitGameHandler,
      selectDifficultyHandler,
      selectCategoryHandler,
    },
  };
  return (
    <GameContext.Provider value={state}>{props.children}</GameContext.Provider>
  );
};

export default GameProvider;
