import { useParams } from "react-router-dom";
import GameView from "../components/GameView";
import { Game } from "../game/Game";

const GameScreen = ({ game }: { game: Game }) => {
  const params = useParams();
  console.log(params);

  game.init();
  game.setCharacter(params.character);
  return (
    <div>
      <GameView game={game} />
    </div>
  );
};

export default GameScreen;
