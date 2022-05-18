import { autorun, makeObservable, observable, runInAction } from "mobx";
import { BaseCharacter } from "./BaseCharacter";
import CharacterAbilities from "./data/characterAbilities";

export interface CharacterAbility {
  name: string;
  damage: number;
  cd: number;
  ready: boolean;
}
export interface CharacterTypes {
  "Pyromancer": string;
  "Monk": string;
  "Knight": string;
}

export class Character extends BaseCharacter {
  id: number;
  lvl: number = 1;
  exp: number = 0;
  hp: number = 250;
  mp: number = 250;
  maxHP: number = 250;
  maxMP: number = 200;
  damage: number = 10;
  defense: number = 10;
  crit: number = 5;
  didCrit: boolean = false;
  abilities: CharacterAbility[] = [];
  isDead: boolean = false;
  constructor(public type: string) {
    super();
    makeObservable(this, {
      abilities: observable,
    });
    this.id = Math.random();
    this.abilities = CharacterAbilities[type as keyof CharacterTypes];
  }
  attack(characterAbility: CharacterAbility) {
    const ch = this.abilities.find((v) => v.name === characterAbility.name);

    if (ch) {
      ch.ready = false;
      autorun(
        () => {
          ch.ready = true;
          this.resetAbilities();
        },
        { delay: ch.cd * 1000 }
      );
      this.resetAbilities(ch);
    }
  }
  resetAbilities(ability?: CharacterAbility) {
    this.abilities = this.abilities.map((v) =>
      v.name === ability?.name ? ability : v
    );
  }

  calculateAttackDamage(ability: CharacterAbility) {
    const doesCrit = Math.random() * 100 < this.crit;
    let critDamage = 1;
    if (doesCrit) {
      critDamage = 2;
      this.didCrit = true;
      autorun(() => (this.didCrit = false), { delay: 3000 });
    }
    return (
      Math.round(Math.random() * this.lvl) * this.damage +
      ability.damage * critDamage
    );
  }
  /* calculateLevel(level: number, exp: number) {
    if(exp === level*300) {
      this.lvl++;
      this.exp = 0; 
      return   
    }
  } */

  getAttacked(damage: number) {
    this.hp -= damage;

    this.getAttackedBase();

    if (this.hp <= 0) this.isDead = true;
  }
}
