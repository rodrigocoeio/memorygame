import { FC, useContext } from "react";
import { GameContext } from "../../providers/GameProvider";
import { CardContext } from "../../providers/CardProvider";
import CardType from "../../types/Card";
import Controls from "./Controls/Controls";
import Finished from "./Finished/Finished";
import Cover from "./Card/Cover";
import Card from "./Card/Card";
import styles from "./Game.module.css";

const Game: FC = () => {
  const gameContext = useContext(GameContext);
  const cardContext = useContext(CardContext);
  const { difficulty, cardsSet } = gameContext;
  const { cardOpened, cardMatch, cardsMatched, spyMode, finished } =
    cardContext;

  const isCardOpened = (card: CardType) => {
    return (
      (cardOpened && cardOpened.id === card.id) ||
      (cardMatch && cardMatch.id === card.id) ||
      cardsMatched.includes(card.name) ||
      spyMode
    );
  };

  return (
    <div className={styles.Wrapper}>
      {finished && <Finished />}
      <div
        className={styles.GameBoard + " " + styles[`GameBoard${difficulty}`]}
        style={{ opacity: finished ? 0.1 : 1 }}
      >
        <Controls />

        {cardsSet.map((card, index) => {
          if (isCardOpened(card)) {
            return <Card key={index} indexer={index + 1} card={card} />;
          } else {
            return <Cover key={index} indexer={index + 1} card={card} />;
          }
        })}
      </div>
    </div>
  );
};

export default Game;
