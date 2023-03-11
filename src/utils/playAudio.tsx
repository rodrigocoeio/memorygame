import CardType from "../types/Card";

let playing: boolean | HTMLAudioElement = false;
let queue: string[] = [];

const playAudio = (path: string) => {
  if (playing) {
    queue.push(path);
  } else {
    const audio = new Audio(path);
    audio.play();
    audio.onended = () => {
      playing = false;
      if (queue.length > 0) {
        const playNext = queue.shift() as string;
        playAudio(playNext);
      }
    };
    playing = audio;
  }
};

export const playCard = (card: CardType) => {
  playAudio("/cards/" + card.category + "/" + card.audio);
};

export const playMatched = () => {
  playAudio("/sounds/right" + Math.floor(Math.random() * 3 + 1) + ".mp3");
};

export const playNotMatched = () => {
  playAudio("/sounds/wrong" + Math.floor(Math.random() * 3 + 1) + ".mp3");
};

export const playFinished = () => {
  playAudio("/sounds/finished.mp3");
};

export default playAudio;
