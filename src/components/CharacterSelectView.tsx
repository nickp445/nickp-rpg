const CharacterSelectView = ({ character }: { character: any }) => {
  return (
    <div>
      <img
        className="character-image"
        src={`characters/${character.type}.png`}
      />
    </div>
  );
};

export default CharacterSelectView;
