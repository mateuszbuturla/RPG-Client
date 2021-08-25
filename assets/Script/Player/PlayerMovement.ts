import CustomAnimator from "../Common/CustomAnimator";
const { ccclass, property } = cc._decorator;
import { io } from "socket.io-client/dist/socket.io.js";

@ccclass
export default class NewClass extends cc.Component {
  public keys: Map<number, boolean> = new Map();

  @property()
  localPlayer: boolean = true;

  @property()
  moveSpeed: number = 100;

  moveLeftAnimation: string = "moveLeft";
  moveRightAnimation: string = "moveRight";
  moveUpAnimation: string = "moveUp";
  moveDownAnimation: string = "moveDown";

  customAnimator: CustomAnimator;

  onKeyDown(e: cc.Event.EventCustom) {
    this.keys.set(e.keyCode, true);
  }
  onKeyUp(e: cc.Event.EventCustom) {
    this.keys.delete(e.keyCode);
    if (e.keyCode === cc.macro.KEY.a)
      global.socket.emit("keyRelese", { inputId: "left", state: false });
    if (e.keyCode === cc.macro.KEY.d)
      global.socket.emit("keyRelese", { inputId: "right", state: false });
    if (e.keyCode === cc.macro.KEY.w)
      global.socket.emit("keyRelese", { inputId: "up", state: false });
    if (e.keyCode === cc.macro.KEY.s)
      global.socket.emit("keyRelese", { inputId: "down", state: false });
  }

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  start() {
    this.customAnimator = this.node.getComponent("CustomAnimator");
  }

  update(dt) {
    if (this.localPlayer) {
      if (this.keys.has(cc.macro.KEY.d))
        global.socket.emit("keyPress", { inputId: "right", state: true });
      if (this.keys.has(cc.macro.KEY.s))
        global.socket.emit("keyPress", { inputId: "down", state: true });
      if (this.keys.has(cc.macro.KEY.a))
        global.socket.emit("keyPress", { inputId: "left", state: true });
      if (this.keys.has(cc.macro.KEY.w))
        global.socket.emit("keyPress", { inputId: "up", state: true });
      if (this.keys.has(cc.macro.KEY.z)) {
        global.socket.emit("takeDamage", 1); //@TODO: remove
      }
    }
  }

  updateMoveAnimation(movementDirection: cc.Vec2): void {
    if (this.customAnimator) {
      if (movementDirection.x > 0)
        this.customAnimator.changeAnimation(this.moveRightAnimation);
      else if (movementDirection.x < 0)
        this.customAnimator.changeAnimation(this.moveLeftAnimation);
      else if (movementDirection.y > 0)
        this.customAnimator.changeAnimation(this.moveUpAnimation);
      else if (movementDirection.y < 0)
        this.customAnimator.changeAnimation(this.moveDownAnimation);
      else {
        const currentAnimation = this.customAnimator.currentPlayingAnimation;
        switch (currentAnimation) {
          case this.moveDownAnimation:
            this.customAnimator.changeAnimation("idleDown");
            break;
          case this.moveUpAnimation:
            this.customAnimator.changeAnimation("idleUp");
            break;
          case this.moveLeftAnimation:
            this.customAnimator.changeAnimation("idleLeft");
            break;
          case this.moveRightAnimation:
            this.customAnimator.changeAnimation("idleRight");
            break;
        }
      }
    }
  }
}
