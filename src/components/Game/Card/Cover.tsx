import { FC } from "react";
import styles from "./Cover.module.css";

type Props = {
  indexer: number;
  card: any;
  cardMatch: any;
  playCardHandler: (e: any, card: any) => void;
  openCardHandler: (e: any, card: any) => void;
};

const Cover: FC<Props> = (props: Props) => {
  const { indexer, card, playCardHandler, openCardHandler } = props;

  let coverStyles = styles.Cover;

  if (!props.cardMatch) {
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
};

export default Cover;