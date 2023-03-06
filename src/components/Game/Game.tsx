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
  const [cardShake, setCardShake] = useState(false);
  const [finished, setFinished] = useState(false);

  const playAudioHandler = (card: Card) => {
    if (cardOpened && cardMatch) return false;
    playCard(card);
  };

  const newGameHandler = () => {
    setCardOpened(0);
    setCardMatch(0);
    setCardsMatched([]);
    setFinished(false);
    props.onStartGame();
  };

  const openCardHandler = (event: any, card: Card) => {
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

  const playCardHandler = (e: any, card: Card) => {
    e.stopPropagation();
    playCard(card);
  };

  let coverStyles = styles.Card + " " + styles.Cover;
  let cardStyles = styles.Card + " " + styles.Clickable;

  if (!cardMatch) {
    coverStyles += " " + styles.Clickable + " " + styles.Selectable;
  }

  if (cardShake) {
    cardStyles += " " + styles.Shake;
  }

  return (
    <div className={styles.Wrapper}>
      {finished && (
        <div className={styles.Finished}>
          <img src="/images/congrats.png"></img>
          <br />
          Game Finished!
          <br />
          Wanna play more?!
          <br />
          <button onClick={newGameHandler}>Yes!</button>
          <button
            onClick={() => {
              setFinished(false);
            }}
            style={{ opacity: 0.6 }}
          >
            No!
          </button>
        </div>
      )}
      <div
        className={styles.GameBoard + " " + styles[`GameBoard${difficulty}`]}
        style={{ opacity: finished ? 0.3 : 1 }}
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
              onClick={(e) => openCardHandler(e, card)}
            >
              <span>{indexer}</span>
              <button
                onClick={(e) => playCardHandler(e, card)}
                className={styles.Play}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-speaker-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-2.5 6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
                  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
                </svg>
              </button>
            </div>
          );
        })}

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
    </div>
  );
};

export default Game;
