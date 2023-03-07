import { FC } from "react";
import styles from "./Finished.module.css";

type Props = {
    onNewGameHandler: () => void;
    onClose: () => void;
}

const Finished: FC<Props> = (props:Props) => {
  return (
    <div className={styles.Finished}>
      <img src="/images/congrats.png"></img>
      <br />
      Game Finished!
      <br />
      Wanna play more?!
      <br />
      <button onClick={props.onNewGameHandler}>Yes!</button>
      <button
        onClick={props.onClose}
        style={{ opacity: 0.5 }}
      >
        No!
      </button>
    </div>
  );
};

export default Finished;
