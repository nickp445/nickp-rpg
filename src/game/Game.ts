import { autorun, makeAutoObservable } from "mobx";
import { Character, CharacterAbility } from "./Character";
import { Enemy } from "./Enemy";

export class Game {
  
  enemyTypes = ["Goblin", "Orc", "Skeleton"];
  characters: Character[] = [new Character("Pyromancer"), new Character("Monk"), new Character("Knight")];
  character: Character = new Character("Pyromancer");
  enemies: Enemy[] = [];
  gameOver: boolean = false;
  totalEnemies: number = 0;
  constructor() {
    makeAutoObservable(this);
  }

  init() {
    console.log("init");
    let x = 0;
    while (this.enemies.length <= 2) {
      x++;
      this.enemies.push(
        new Enemy(
          this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
        )
      );
    }
    this.enemies.forEach((enemy, i)  => enemy.id = i);
    this.totalEnemies = this.enemies.length;
  }

  characterAttack(character: Character, characterAbility: CharacterAbility) {
    if (this.gameOver) return;
    const totalDamage = character.calculateAttackDamage(characterAbility);
    character.attack(characterAbility);
    let en = this.getEnemy();
    console.log(this.enemies.length, this.totalEnemies);
    
    if (en) {
      en.getAttacked(totalDamage);
      if(en.hp > 0) autorun(
        () => {
          character.getAttacked(10);
          if (character.isDead) this.gameOver = true;
        },
        { delay: 2000 }
      );
      if(en.isDead) this.enemies.splice(en.id, 1)
    }
    if(en?.isDead){
     this.character.exp += 100
     this.totalEnemies -= 1
     this.enemies.splice(en.id, 1)
     if(this.enemies.length <= 0) this.gameOver = true;
     console.log(this.character.exp);
    }
    
  }

  getEnemy() {
    const deadEnemies = this.enemies.filter((v) => v.isDead).length;
    // if (deadEnemies === this.totalEnemies) {
    //   console.log(deadEnemies, this.enemies)
    //   this.gameOver = true;
    //   return;
    // }

    let en = this.enemies[Math.floor(Math.random() * this.enemies.length)];
    if (en.isDead)
      en = this.enemies[Math.floor(Math.random() * this.enemies.length)];
    return en;
  }

  setCharacter(character: string | undefined) {
    if (character) this.character = new Character(character);
  }
}
