import { FC, useContext } from "react";
import styles from "./Cover.module.css";
import speakerSvg from "../../../assets/speaker.svg";
import CardType from "../../../types/Card";
import { CardContext } from "../../../providers/CardProvider";

type Props = {
  indexer: number;
  card: CardType;
};

const Cover: FC<Props> = (props: Props) => {
  const { indexer, card } = props;
  const cardContext = useContext(CardContext);
  const { cardMatch, handlers } = cardContext;

  let coverStyles = styles.Cover;

  if (!cardMatch) {
    coverStyles += " " + styles.Clickable + " " + styles.Selectable;
  }

  return (
    <div
      key={`cover${indexer}`}
      className={coverStyles}
      onClick={(e) => handlers.openCardHandler(e, card)}
    >
      <span>{indexer}</span>
      <button
        onClick={(e) => handlers.playCardHandler(e, card)}
        className={styles.Play}
      >
        <img src={speakerSvg} height="24" />
      </button>
    </div>
  );
};

export default Cover;
