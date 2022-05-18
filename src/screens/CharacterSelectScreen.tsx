import { useNavigate } from "react-router-dom";
import CharacterSelectView from "../components/CharacterSelectView";
import { Character } from "../game/Character";
import { Game } from "../game/Game";

const CharacterSelectScreen = ({ game }: { game: Game }) => {
  const navigate = useNavigate();

  function startGame(character: Character) {
    navigate(`/game/${character.type}`);
  }
  return (
    <div>
      <div>Select Character</div>
      {game.characters.map((v) => (
        <div key={v.id} onClick={() => startGame(v)}>
          <CharacterSelectView character={v} />
        </div>
      ))}
    </div>
  );
};

export default CharacterSelectScreen;
