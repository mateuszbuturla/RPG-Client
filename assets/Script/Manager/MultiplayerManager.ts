import { IPlayerRes } from "../../../../RPG-Server/src/types/player/player";
import { io, Socket } from "socket.io-client/dist/socket.io.js";
import { filterObject } from "../Utils/filterObject";
import { IOtherPlayer } from "../../types/player";
import PlayerMovement from "../Player/PlayerMovement";
const { ccclass, property } = cc._decorator;

interface INewPositionRes {
  players: IPlayerRes[];
}

@ccclass
export default class MultiplayerManager extends cc.Component {
  @property(cc.Prefab)
  playerPrefab: cc.Prefab;

  socket: Socket;
  playerList: IOtherPlayer = {};
  scene: cc.Scene;

  start() {
    this.scene = cc.director.getScene();
    console.log("Starting connection to socket.io server");
    this.socket = io("http://localhost:3000", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
      transports: ["websocket", "polling", "flashsocket"],
    });

    this.socket.on("connect", () => {
      console.log(`Socket.ID: ${this.socket.id}`);
    });

    this.socket.on("newPositions", (data: INewPositionRes) => {
      data.players.map((player) => {
        if (!this.playerList.hasOwnProperty(player.id)) {
          this.createNewPlayer(player);
        } else {
          this.updatePlayerNode(this.playerList[player.id].node, player);
        }
      });

      const disconnectedPlayers = filterObject(
        this.playerList,
        (player) => !data.players.map((player) => player.id).includes(player.id)
      );

      Object.keys(disconnectedPlayers).forEach((key) => {
        disconnectedPlayers[key].node.destroy();
        delete this.playerList[disconnectedPlayers[key].id];
      });
    });

    global.socket = this.socket;
  }

  createNewPlayer(data: IPlayerRes): void {
    const node = cc.instantiate(this.playerPrefab);
    node.setPosition(new cc.Vec3(data.position.x, data.position.y, 0));
    node.getComponent(PlayerMovement).localPlayer = data.id === this.socket.id;
    this.scene.addChild(node);
    this.playerList[data.id] = { id: data.id, node: node };
  }

  updatePlayerNode(node: cc.Node, data: IPlayerRes): void {
    node.setPosition(new cc.Vec3(data.position.x, data.position.y, 0));
    node
      .getComponent(PlayerMovement)
      .updateMoveAnimation(
        new cc.Vec2(data.moveDirection.x, data.moveDirection.y)
      );
  }
}
