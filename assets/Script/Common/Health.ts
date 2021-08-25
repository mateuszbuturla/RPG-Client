const { ccclass, property } = cc._decorator;

@ccclass
export default class Health extends cc.Component {
  @property()
  health: number;

  @property()
  maxHealth: number;
}
