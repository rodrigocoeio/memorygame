import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameProvider, GameContext } from "./providers/GameProvider";
import { CardProvider } from "./providers/CardProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </GameProvider>
  </React.StrictMode>
);
