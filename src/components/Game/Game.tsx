import { FC, useState } from "react";
import Controls from "./Controls/Controls";
import Finished from "./Finished/Finished";
import Cover from "./Card/Cover";
import Card from "./Card/Card";
import styles from "./Game.module.css";

type CardType = {
  id: number;
  name: string;
  category: string;
  audio: string;
  image: string;
  match: number;
};

type GameProps = {
  cardsSet: CardType[];
  difficulty: "EASY" | "NORMAL" | "HARD";
  onStartGame: () => void;
  onQuitGame: () => void;
};

const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.play();
};

const playCard = (card: CardType) => {
  playAudio("/cards/" + card.category + "/" + card.audio);
};

const playMatched = () => {
  playAudio("/sounds/right" + Math.floor(Math.random() * 3 + 1) + ".mp3");
};

const playNotMatched = () => {
  playAudio("/sounds/wrong" + Math.floor(Math.random() * 3 + 1) + ".mp3");
};

const playFinished = () => {
  playAudio("/sounds/finished.mp3");
};

const Game: FC<GameProps> = (props: GameProps) => {
  const { cardsSet, difficulty, onStartGame, onQuitGame } = props;
  const [cardsMatched, setCardsMatched] = useState<string[]>([]);
  const [cardOpenedName, setCardOpenedName] = useState("");
  const [cardOpened, setCardOpened] = useState(0);
  const [cardMatch, setCardMatch] = useState(0);
  const [cardShake, setCardShake] = useState(false);
  const [spyMode, setSpyMode] = useState(false);
  const [finished, setFinished] = useState(false);

  const newGameHandler = () => {
    setCardOpened(0);
    setCardMatch(0);
    setCardsMatched([]);
    setFinished(false);
    onStartGame();
  };

  const quitGameHandler = () => {
    onQuitGame();
  };

  const openCardHandler = (event: any, card: CardType) => {
    if (cardOpened && cardMatch) return false;

    playCard(card);

    // Open Match Card
    if (cardOpened) {
      setCardMatch(card.id);

      // Matched
      if (card.name === cardOpenedName) {
        setCardsMatched((cardsMatched) => [card.name, ...cardsMatched]);
        setCardOpened(0);
        setCardMatch(0);
        playMatched();

        // Not Matched
      } else {
        setTimeout(() => {
          setCardShake(true);
        }, 2500);

        setTimeout(() => {
          setCardOpened(0);
          setCardMatch(0);
          setCardShake(false);
        }, 3000);
        playNotMatched();
      }
    }

    // Open Card
    else {
      setCardOpened(card.id);
      setCardOpenedName(card.name);

      // Open Last Card
      if (cardsMatched.length === (cardsSet.length - 1) / 2) {
        setCardsMatched((cardsMatched) => [card.name, ...cardsMatched]);
        playMatched();
        setTimeout(() => {
          setFinished(true);
          playFinished();
        }, 2000);
      }
    }
  };

  const playCardHandler = (e: any, card: CardType) => {
    e.stopPropagation();
    if (cardOpened && cardMatch) return false;
    playCard(card);
  };

  const spyHandler = () => {
    if (cardsMatched.length > 0 || cardOpened) return setSpyMode(false);

    if (!spyMode) {
      setSpyMode(true);
    } else {
      setCardShake(true);
      setTimeout(() => {
        setSpyMode(false);
        setCardShake(false);
      }, 500);
    }
  };

  return (
    <div className={styles.Wrapper}>
      {finished && (
        <Finished
          onNewGameHandler={newGameHandler}
          onClose={() => {
            setFinished(false);
          }}
        />
      )}
      <div
        className={styles.GameBoard + " " + styles[`GameBoard${difficulty}`]}
        style={{ opacity: finished ? 0.1 : 1 }}
      >
        <Controls
          cardOpened={cardOpened}
          cardsMatched={cardsMatched}
          spyMode={spyMode}
          onNewGame={newGameHandler}
          onSpy={spyHandler}
          onQuitGame={quitGameHandler}
        />

        {cardsSet.map((card, index) => {
          const indexer = index + 1;
          if (
            cardOpened === card.id ||
            cardMatch === card.id ||
            cardsMatched.includes(card.name) ||
            spyMode
          ) {
            return (
              <Card
                indexer={indexer}
                card={card}
                cardOpened={cardOpened}
                cardMatch={cardMatch}
                cardsMatched={cardsMatched}
                cardShake={cardShake}
                playCardHandler={playCardHandler}
                openCardHandler={openCardHandler}
              />
            );
          }

          // Show Cover
          return (
            <Cover
              indexer={indexer}
              card={card}
              cardMatch={cardMatch}
              playCardHandler={playCardHandler}
              openCardHandler={openCardHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;
