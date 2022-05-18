import { action, autorun, makeObservable, observable } from "mobx";

export class BaseCharacter {
  isBeingAttacked: boolean = false;
  showAttackTime: number = 1000;
  constructor() {
    makeObservable(this, {
      getAttackedBase: action,
      isBeingAttacked: observable,
    });
  }
  getAttackedBase() {
    this.isBeingAttacked = true;
    autorun(() => (this.isBeingAttacked = false), {
      delay: this.showAttackTime,
    });
  }
}
