const { ccclass, property } = cc._decorator;

interface IMoveAnimation {
  left: string;
  right: string;
  top: string;
  bottom: string;
}

@ccclass
export default class NewClass extends cc.Component {
  @property()
  moveSpeed: number = 100;

  @property()
  moveLeftAnimation: string = "moveLeft";
  @property()
  moveRightAnimation: string = "moveRight";
  @property()
  moveTopAnimation: string = "moveTop";
  @property()
  moveBottomAnimation: string = "moveBottom";

  animator: cc.Animation;

  onLoad() {}

  start() {
    this.animator = this.node.getComponent("Animation");
  }

  update(dt) {}
}
