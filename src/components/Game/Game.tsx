import { FC, useState } from "react";
import styles from "./Game.module.css";

type Card = {
  id: number;
  name: string;
  category: string;
  audio: string;
  image: string;
  match: number;
};

type GameProps = {
  cardsSet: Card[];
  difficulty: "EASY" | "NORMAL" | "HARD";
  onStartGame: () => void;
  onQuitGame: () => void;
};

const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.play();
};

const playCard = (card: Card) => {
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
  const cardsSet = props.cardsSet;
  const difficulty = props.difficulty;
  const [cardsMatched, setCardsMatched] = useState<string[]>([]);
  const [cardOpenedName, setCardOpenedName] = useState("");
  const [cardOpened, setCardOpened] = useState(0);
  const [cardMatch, setCardMatch] = useState(0);
  const [finsihed, setFinished] = useState(false);

  const playAudioHandler = (card: Card) => {
    playCard(card);
  };

  const newGameHandler = () => {
    setCardOpened(0);
    setCardMatch(0);
    setCardsMatched([]);
    props.onStartGame();
  };

  const openCardHandler = (card: Card) => {
    if (cardOpened && cardMatch) return false;

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
          setCardOpened(0);
          setCardMatch(0);
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

    playCard(card);
  };

  let coverStyles = styles.Card + " " + styles.Cover;
  let cardStyles = styles.Card + " " + styles.Clickable;

  if (!cardMatch) {
    coverStyles += " " + styles.Clickable + " " + styles.Selectable;
  }

  return (
    <div className={styles.Wrapper}>
      <div
        className={styles.GameBoard + " " + styles[`GameBoard${difficulty}`]}
      >
        {cardsSet.map((card, index) => {
          const indexer = index + 1;
          if (
            cardOpened === card.id ||
            cardMatch === card.id ||
            cardsMatched.includes(card.name)
          ) {
            let currentCardStyles = cardStyles;
            if (cardOpened === card.id || cardMatch === card.id)
              currentCardStyles += " " + styles.Opened;
            if (cardsMatched.includes(card.name))
              currentCardStyles += " " + styles.Matched;

            return (
              <div
                key={`card${indexer}`}
                className={currentCardStyles}
                style={{
                  backgroundImage: `url("/cards/${card.category}/${card.image}")`,
                }}
                onClick={() => playAudioHandler(card)}
              >
                <span>{card.name}</span>
              </div>
            );
          }
          return (
            <div
              key={`cover${indexer}`}
              className={coverStyles}
              onClick={() => openCardHandler(card)}
            >
              {indexer}
            </div>
          );
        })}
      </div>

      <div className={styles.Controls}>
        <button onClick={newGameHandler} className={styles.NewGame}>
          New Game&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <button
          onClick={props.onQuitGame}
          className={styles.QuitGame}
          title="Quit Game"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Game;
