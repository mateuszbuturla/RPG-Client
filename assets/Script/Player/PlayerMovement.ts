import CustomAnimator from "../Common/CustomAnimator";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass  extends cc.Component {
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
    this.customAnimator = this.node.getComponent("CustomAnimator")
  }

  update(dt) {
    const movementDirection = new cc.Vec3(0, 0, 0);
    this.keys.has(cc.macro.KEY.a)
      ? (movementDirection.x = -1)
      : this.keys.has(cc.macro.KEY.d)
      ? (movementDirection.x = 1)
      : 0;
    this.keys.has(cc.macro.KEY.s)
      ? (movementDirection.y = -1)
      : this.keys.has(cc.macro.KEY.w)
      ? (movementDirection.y = 1)
      : 0;

    this.node.setPosition(
      this.node.position.x + movementDirection.x * this.moveSpeed * dt
      this.node.position.y + movementDirection.y * this.moveSpeed * dt
      this.node.position.z
    );
    if (movementDirection.x > 0) {
      this.customAnimator.changeAnimation(this.moveRightAnimation)
    }
    else if (movementDirection.x < 0) {
      this.customAnimator.changeAnimation(this.moveLeftAnimation)
    }
    else if (movementDirection.y > 0) {
      this.customAnimator.changeAnimation(this.moveTopAnimation)
    }
    else if (movementDirection.y < 0) {
      this.customAnimator.changeAnimation(this.moveBottomAnimation)
    }
    else {
      this.customAnimator.changeAnimation(this.idleBottomAnimation)
    }
  }
}
