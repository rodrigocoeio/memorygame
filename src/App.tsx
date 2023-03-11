import { FC, useContext } from "react";
import { GameContext } from "./providers/GameProvider";
import Welcome from "./components/Welcome/Welcome";
import Game from "./components/Game/Game";
import "./App.css";

const App: FC = () => {
  const gameContext = useContext(GameContext);
  const { started } = gameContext;

  if (!started) {
    return <Welcome />;
  } else {
    return <Game />;
  }
};

export default App;
