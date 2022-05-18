import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterSelectScreen from "./screens/CharacterSelectScreen";
import GameScreen from "./screens/GameScreen";
import { Game } from "./game/Game";

export default function App() {
  const game = new Game();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CharacterSelectScreen game={game} />}
          ></Route>
          <Route
            path="/game/:character"
            element={<GameScreen game={game} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
