import CustomAnimator from "../Common/CustomAnimator";
const { ccclass, property } = cc._decorator;
import { io } from "socket.io-client/dist/socket.io.js";

@ccclass
export default class NewClass extends cc.Component {
  public keys: Map<number, boolean> = new Map();

  @property()
  moveSpeed: number = 100;

  @property()
  idleBottomAnimation: string = "idleBottom";
  @property()
  moveLeftAnimation: string = "moveLeft";
  @property()
  moveRightAnimation: string = "moveRight";
  @property()
  moveTopAnimation: string = "moveTop";
  @property()
  moveBottomAnimation: string = "moveBottom";

  customAnimator: CustomAnimator;

  onKeyDown(e: cc.Event.EventCustom) {
    this.keys.set(e.keyCode, true);
  }
  onKeyUp(e: cc.Event.EventCustom) {
    this.keys.delete(e.keyCode);
  }

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  start() {
    this.customAnimator = this.node.getComponent("CustomAnimator");
  }

  update(dt) {
    if (this.keys.has(cc.macro.KEY.d))
      global.socket.emit("keyPress", { inputId: "right", state: true });
    if (this.keys.has(cc.macro.KEY.s))
      global.socket.emit("keyPress", { inputId: "down", state: true });
    if (this.keys.has(cc.macro.KEY.a))
      global.socket.emit("keyPress", { inputId: "left", state: true });
    if (this.keys.has(cc.macro.KEY.w))
      global.socket.emit("keyPress", { inputId: "up", state: true });
    // if (movementDirection.x > 0) {
    //   this.customAnimator.changeAnimation(this.moveRightAnimation)
    //   global.socket.emit("player-move", {x: this.node.position.x, y: this.node.position.y, z: this.node.position.z});
    // }
    // else if (movementDirection.x < 0) {
    //   this.customAnimator.changeAnimation(this.moveLeftAnimation)
    //   global.socket.emit("player-move", {x: this.node.position.x, y: this.node.position.y, z: this.node.position.z});
    // }
    // else if (movementDirection.y > 0) {
    //   this.customAnimator.changeAnimation(this.moveTopAnimation)
    //   global.socket.emit("player-move", {x: this.node.position.x, y: this.node.position.y, z: this.node.position.z});
    // }
    // else if (movementDirection.y < 0) {
    //   this.customAnimator.changeAnimation(this.moveBottomAnimation)
    //   global.socket.emit("player-move", {x: this.node.position.x, y: this.node.position.y, z: this.node.position.z});
    // }
    // else {
    //   this.customAnimator.changeAnimation(this.idleBottomAnimation)
    // }
  }
}
