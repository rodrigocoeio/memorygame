import { FC } from "react";
import styles from "./Cover.module.css";
import speakerSvg from "../../../assets/speaker.svg";
import CardType from "../../../types/Card";

type Props = {
  indexer: number;
  card: CardType;
  cardMatch: CardType | undefined;
  playCardHandler: (e: any, card: CardType) => void;
  openCardHandler: (e: any, card: CardType) => void;
};

const Cover: FC<Props> = (props: Props) => {
  const { indexer, card, cardMatch, playCardHandler, openCardHandler } = props;

  let coverStyles = styles.Cover;

  if (!cardMatch) {
    coverStyles += " " + styles.Clickable + " " + styles.Selectable;
  }

  return (
    <div
      key={`cover${indexer}`}
      className={coverStyles}
      onClick={(e) => openCardHandler(e, card)}
    >
      <span>{indexer}</span>
      <button onClick={(e) => playCardHandler(e, card)} className={styles.Play}>
        <img src={speakerSvg} height="24" />
      </button>
    </div>
  );
};

export default Cover;
