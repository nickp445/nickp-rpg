import { observer } from "mobx-react-lite";
import { emit } from "process";
import { Enemy } from "../game/Enemy";
import "./EnemyViewStyles.scss";

const EnemyView = observer(({ enemy }: { enemy: Enemy }) => {
  return (
    <div
      className={`
      ${enemy.isBeingAttacked ? "Enemy-damage" : ""} 
      ${enemy.isDead ? "Enemy-Dead" : ""}
      Enemy`}
    >
      {!enemy.isDead && <img className={"enemy-image"} src={`../enemies/${enemy.type}.png`} />}
      {enemy.isDead ? "Dead" : <div><div>{enemy.type}</div><div>HP {enemy.hp} / {enemy.maxHP}</div></div>}
    </div>
  );
});

export default EnemyView;
