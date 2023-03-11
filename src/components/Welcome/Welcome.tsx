import { FC, useContext } from "react";
import styles from "./Welcome.module.css";
import { GameContext } from "../../providers/GameProvider";

type DIFFICULTY = "EASY" | "NORMAL" | "HARD";

const Welcome: FC = () => {
  const gameContext = useContext(GameContext);
  const { difficulty, category, categories, pleaseSelectCategory, handlers } =
    gameContext;

  const selectDifficultyHandler = (event: any) => {
    handlers.selectDifficultyHandler(event.target.value);
  };
  const selectCategoryHandler = (event: any) => {
    handlers.selectCategoryHandler(event.target.value);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Welcome}>
        <div className={styles.Logo}>
          <img src="/images/memorygame.png" />
          <h1>Memory Game</h1>
        </div>

        <div className={styles.Controls}>
          <select value={difficulty} onChange={selectDifficultyHandler}>
            <option value="" disabled>
              Choose a difficulty
            </option>
            <option value="EASY">Easy</option>
            <option value="NORMAL">Normal</option>
            <option value="HARD">Hard</option>
          </select>

          <select
            value={category}
            className={pleaseSelectCategory ? styles.PleaseSelect : ""}
            onChange={selectCategoryHandler}
          >
            <option value="" disabled>
              Choose a category
            </option>

            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            onClick={handlers.startGameHandler}
            className={styles.StartGame}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
