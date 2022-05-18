import { action, makeObservable, observable, override } from "mobx";
import { BaseCharacter } from "./BaseCharacter";
import { Character } from "./Character";
import { Game } from "./Game";


export class Enemy extends BaseCharacter {
  id: number = 0;
  hp: number = 150;
  maxHP: number = 150;
  isDead: boolean = false;
  constructor(public type: string) {
    super();
    makeObservable(this, {});
    this.id = Math.random();
  }

  getAttacked(damage: number) {
    this.hp -= damage;
    this.getAttackedBase();
    if (this.hp <= 0) this.isDead = true;
  }
}
