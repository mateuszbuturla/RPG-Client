const { ccclass, property } = cc._decorator;

@ccclass
export default class Collision extends cc.Component {
  @property()
  tag: string = "";

  start() {
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
    manager.enabledDebugDraw = true;
    manager.enabledDrawBoundingBox = true;
  }
}
