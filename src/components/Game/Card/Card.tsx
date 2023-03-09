import { FC } from "react";
import styles from "./Card.module.css";
import CardType from "../../../types/Card";

type Props = {
  indexer: number;
  card: CardType;
  cardOpened: CardType | undefined;
  cardMatch: CardType | undefined;
  cardsMatched: string[];
  cardShake: boolean;
  playCardHandler: (e: any, card: CardType) => void;
  openCardHandler: (e: any, card: CardType) => void;
};

const Card: FC<Props> = (props: Props) => {
  const {
    indexer,
    card,
    cardOpened,
    cardMatch,
    cardsMatched,
    cardShake,
    playCardHandler,
  } = props;

  let cardStyles = styles.Card;

  if (!cardOpened && !cardMatch) {
    cardStyles += " " + styles.Clickable;
  }
  if (cardShake) {
    cardStyles += " " + styles.Shake;
  }
  if (
    (cardOpened && cardOpened.id === card.id) ||
    (cardMatch && cardMatch.id === card.id)
  ) {
    cardStyles += " " + styles.Opened;
  }
  if (cardsMatched.includes(card.name)) cardStyles += " " + styles.Matched;

  return (
    <div
      key={`card${indexer}`}
      className={cardStyles}
      style={{
        backgroundImage: `url("/cards/${card.category}/${card.image}")`,
      }}
      onClick={(e) => playCardHandler(e, card)}
    >
      <span>{card.name}</span>
    </div>
  );
};

export default Card;
