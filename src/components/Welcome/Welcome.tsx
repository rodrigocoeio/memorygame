import { FC } from "react";
import styles from "./Welcome.module.css";
import CategoryType from "../../types/Category";

type DIFFICULTY = "EASY" | "NORMAL" | "HARD";

type WelcomeProps = {
  difficulty: string;
  categories: CategoryType[];
  category: string;
  pleaseSelectCategory: boolean;
  onStartGame: () => void;
  onSelectDifficulty: (difficulty: DIFFICULTY) => void;
  onSelectCategory: (category: string) => void;
};

const Welcome: FC<WelcomeProps> = (props: WelcomeProps) => {
  const categories = props.categories;

  const startGameHandler = () => {
    props.onStartGame();
  };
  const selectDifficultyHandler = (event: any) => {
    props.onSelectDifficulty(event.target.value);
  };
  const selectCategoryHandler = (event: any) => {
    props.onSelectCategory(event.target.value);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Welcome}>
        <div className={styles.Logo}>
          <img src="/images/memorygame.png" />
          <h1>Memory Game</h1>
        </div>

        <div className={styles.Controls}>
          <select value={props.difficulty} onChange={selectDifficultyHandler}>
            <option value="" disabled>
              Choose a difficulty
            </option>
            <option value="EASY">Easy</option>
            <option value="NORMAL">Normal</option>
            <option value="HARD">Hard</option>
          </select>

          <select
            value={props.category}
            className={props.pleaseSelectCategory ? styles.PleaseSelect : ""}
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

          <button onClick={startGameHandler} className={styles.StartGame}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
