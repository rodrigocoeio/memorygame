import "./App.css";
import Welcome from "./components/Welcome/Welcome";
import Game from "./components/Game/Game";
import { useEffect, useState } from "react";
import loadCardsSet from "./utils/loadCardsSet";
import CardType from "./types/Card";
import CategoryType from "./types/Category";

type DIFFICULTY = "EASY" | "NORMAL" | "HARD";

function App() {
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<DIFFICULTY>("NORMAL");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState("");
  const [cardsSet, setCardsSet] = useState<CardType[]>([]);
  const [pleaseSelectCategory, setPleaseSelectCategory] = useState(false);

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

  if (!started)
    return (
      <Welcome
        difficulty={difficulty}
        categories={categories}
        category={category}
        pleaseSelectCategory={pleaseSelectCategory}
        onStartGame={startGameHandler}
        onSelectCategory={selectCategoryHandler}
        onSelectDifficulty={selectDifficultyHandler}
      />
    );

  return (
    <Game
      cardsSet={cardsSet}
      difficulty={difficulty}
      onStartGame={startGameHandler}
      onQuitGame={quitGameHandler}
    />
  );
}

export default App;
