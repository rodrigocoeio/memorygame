import { FC, useContext } from "react";
import styles from "./Card.module.css";
import CardType from "../../../types/Card";
import { CardContext } from "../../../providers/CardProvider";

type Props = {
  indexer: number;
  card: CardType;
};

const Card: FC<Props> = (props: Props) => {
  const { indexer, card } = props;
  const cardContext = useContext(CardContext);
  const { cardOpened, cardMatch, cardShake, cardsMatched, handlers } =
    cardContext;

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
      onClick={(e) => handlers.playCardHandler(e, card)}
    >
      <span>{card.name}</span>
    </div>
  );
};

export default Card;
