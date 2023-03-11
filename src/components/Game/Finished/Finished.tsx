import { FC, useContext } from "react";
import { CardContext } from "../../../providers/CardProvider";
import styles from "./Finished.module.css";

const Finished: FC = () => {
  const cardContext = useContext(CardContext);
  const { handlers } = cardContext;

  return (
    <div className={styles.Finished}>
      <img src="/images/congrats.png"></img>
      <br />
      Game Finished!
      <br />
      Wanna play more?!
      <br />
      <button onClick={handlers.newGameHandler}>Yes!</button>
      <button onClick={handlers.keepPlayingHandler} style={{ opacity: 0.5 }}>
        No!
      </button>
    </div>
  );
};

export default Finished;
