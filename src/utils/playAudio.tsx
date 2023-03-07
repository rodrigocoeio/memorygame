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

export default playAudio;
