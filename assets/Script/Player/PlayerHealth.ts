import { IPlayerRes } from "../../../../RPG-Server/src/types/player";
import Collision from "../Common/Collision";
import Health from "../Common/Health";

const { ccclass, property } = cc._decorator;

interface INewPositionRes {
  players: IPlayerRes[];
}

@ccclass
export default class PlayerHealth extends Health {
  @property(cc.Node)
  healthBar: cc.Node;

  lavaTimer: number = 1;
  lavaTick: number = 1;
  inLava: boolean = false;

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

  update(dt): void {
    this.healthBar.scaleX = this.health > 0 ? this.health / this.maxHealth : 0;

    if (this.inLava) {
      this.lavaTimer -= dt;
    }

    if (this.lavaTimer < 0) {
      global.socket.emit("takeDamage", 10);
      this.lavaTimer = this.lavaTick;
    }
  }

  onCollisionEnter(other, self): void {
    const tag = other.node.getComponent(Collision).tag;
    console.log(other);

    if (tag === "lava") {
      this.inLava = true;
      this.lavaTimer = 0.1;
    }
  }

  onCollisionExit(other, self): void {
    const tag = other.node.getComponent(Collision).tag;

    if (tag === "lava") {
      this.inLava = false;
    }
  }
}
