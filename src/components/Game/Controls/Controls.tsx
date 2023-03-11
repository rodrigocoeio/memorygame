import { FC, useContext } from "react";
import styles from "./Controls.module.css";
import eyeSvg from "../../../assets/eye.svg";
import eyeSlashSvg from "../../../assets/eye-slash.svg";
import quitGameSvg from "../../../assets/close.svg";
import { GameContext } from "../../../providers/GameProvider";
import { CardContext } from "../../../providers/CardProvider";

const Component: FC = () => {
  const gameContext = useContext(GameContext);
  const cardContext = useContext(CardContext);
  const { handlers: gameHandlers } = gameContext;
  const { cardOpened, cardsMatched, spyMode, clearState, handlers } =
    cardContext;

  const quitGameHandler = () => {
    clearState();
    gameHandlers.quitGameHandler();
  };

  return (
    <div className={styles.Controls}>
      <button onClick={handlers.newGameHandler} className={styles.NewGame}>
        New Game&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
      {cardsMatched.length === 0 && (
        <button
          disabled={cardOpened ? true : false}
          onClick={handlers.spyHandler}
          className={styles.SpyButton}
          title="Spy"
        >
          <img src={!spyMode ? eyeSvg : eyeSlashSvg} />
        </button>
      )}
      <button
        onClick={quitGameHandler}
        className={styles.QuitGame}
        title="Quit Game"
      >
        <img src={quitGameSvg} />
      </button>
    </div>
  );
};

export default Component;
