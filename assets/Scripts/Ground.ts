import { _decorator, Component, Node, UITransform } from 'cc';
import { GameController } from './GameController';
import { MyCanvas } from './Utils/Canvas';
import { lazy } from './Utils/lazy';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    @property({
        type: [Node],
        tooltip: 'All grounds are here',
    })
    public grounds: Node[] = [];

    @lazy private get groundWidth(): number {
        return MyCanvas.width / 2;
    }

    protected onLoad(): void {
        this.grounds.forEach((ground, index) => {
            ground.setPosition(index * this.groundWidth, 0, 0);

            const groundTransform = ground.getComponent(UITransform);
            groundTransform.width = this.groundWidth;
            groundTransform.anchorX = 1;
        });
    }

    protected update(dt: number): void {
        this.grounds.forEach((ground) => {
            ground.setPosition(
                ground.position.x - GameController.instance.groundSpeed * dt,
                0,
                0,
            );
            if (ground.position.x <= -this.groundWidth) {
                ground.setPosition(
                    ground.position.x + this.grounds.length * this.groundWidth,
                    0,
                    0,
                );
            }
        });
    }
}
