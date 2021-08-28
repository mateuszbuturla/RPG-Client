const { ccclass, property } = cc._decorator;

@ccclass
export default class MouseManager extends cc.Component {
  @property(cc.Vec2)
  mousePosition: cc.Vec2 = new cc.Vec2(0, 0);

  start() {
    this.node.on("mousemove", (event) => {
      this.mousePosition = new cc.Vec2(
        event.getLocation().x - this.node.getContentSize().width / 2,
        event.getLocation().y - this.node.getContentSize().height / 2
      );
    });
  }
}
