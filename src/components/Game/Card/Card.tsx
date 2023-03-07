import { FC, useState } from "react";
import styles from "./Card.module.css";

type Props = {
  indexer: number;
  card: any;
  cardOpened: number;
  cardMatch: number;
  cardsMatched: any[];
  cardShake: boolean;
  playCardHandler: (e: any, card: any) => void;
  openCardHandler: (e: any, card: any) => void;
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

  if (cardOpened === card.id || cardMatch === card.id)
    cardStyles += " " + styles.Opened;
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
