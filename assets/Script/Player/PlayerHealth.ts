import { IPlayerRes } from "../../../../RPG-Server/src/types/player";
import Health from "../Common/Health";

const { ccclass, property } = cc._decorator;

interface INewPositionRes {
  players: IPlayerRes[];
}

@ccclass
export default class PlayerHealth extends Health {
  @property(cc.Node)
  healthBar: cc.Node;

  start(): void {
    this.healthBar = cc.find("UI/HealthBar/HealthBar");

    global.socket.on("newPositions", (data: INewPositionRes) => {
      const findPlayer = data.players.find(
        (player) => player.id === global.socket.id
      );
      this.health = findPlayer ? findPlayer.health : this.health;
      this.maxHealth = findPlayer ? findPlayer.maxHealth : this.maxHealth;
    });
  }

  update(): void {
    this.healthBar.scaleX = this.health > 0 ? this.health / this.maxHealth : 0;
  }
}
