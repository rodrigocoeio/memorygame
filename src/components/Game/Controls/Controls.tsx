import { FC } from "react";
import styles from "./Controls.module.css";
import eyeSvg from "../../../assets/eye.svg";
import eyeSlashSvg from "../../../assets/eye-slash.svg";
import quitGameSvg from "../../../assets/close.svg";

type Props = {
  cardOpened: any;
  cardsMatched: any[];
  spyMode: boolean;
  onNewGame: () => void;
  onSpy: () => void;
  onQuitGame: () => void;
};

const Component: FC<Props> = (props: Props) => {
  const { cardOpened, cardsMatched, spyMode, onNewGame, onSpy, onQuitGame } = props;
  return (
    <div className={styles.Controls}>
      <button onClick={onNewGame} className={styles.NewGame}>
        New Game&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
      {cardsMatched.length === 0 && (
        <button
          disabled={cardOpened}
          onClick={onSpy}
          className={styles.SpyButton}
          title="Spy"
        >
          <img src={!spyMode ? eyeSvg : eyeSlashSvg} />
        </button>
      )}
      <button
        onClick={onQuitGame}
        className={styles.QuitGame}
        title="Quit Game"
      >
        <img src={quitGameSvg} />
      </button>
    </div>
  );
};

export default Component;
