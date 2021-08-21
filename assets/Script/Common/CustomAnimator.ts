const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  animator: cc.Animation;

  @property()
  currentPlayingAnimation: string;

  start() {
    this.animator = this.node.getComponent(cc.Animation);
  }

  changeAnimation(animationKey: string): void {
    if (this.currentPlayingAnimation !== animationKey) {
      this.animator.play(animationKey);
      this.currentPlayingAnimation = animationKey;
    }
  }
}
