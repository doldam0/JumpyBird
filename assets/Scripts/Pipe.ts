import { _decorator, CCFloat, Node, randomRange, UITransform } from 'cc';
import { Bird } from './Bird';
import { GameController } from './GameController';
import { MyCanvas } from './Utils/Canvas';
import { lazy } from './Utils/lazy';
import { PrefabComponent } from './Utils/PrefabComponent';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends PrefabComponent {
    @property({
        type: Node,
        tooltip: 'The top pipe',
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'The bottom pipe',
    })
    public bottomPipe: Node;

    @property({
        type: CCFloat,
        tooltip: 'The initial x position',
    })
    public initialX: number = 800;

    private readonly margin = 100;
    private velocity: number = 0;
    private isPassed: boolean = false;

    @lazy private get width(): number {
        return this.topPipe.getComponent(UITransform).width;
    }

    protected onEnable(): void {
        this.node.setPosition(this.initialX, randomRange(-200, 200), 0);
        this.velocity = GameController.instance.pipeSpeed;
        this.isPassed = false;
    }

    protected onDisable(): void {
        this.velocity = 0;
    }

    protected update(dt: number): void {
        if (
            this.node.position.x <=
            -MyCanvas.width / 2 - this.width - this.margin
        ) {
            this.archive();
            return;
        }

        if (
            !this.isPassed &&
            Bird.instance.node.position.x > this.node.position.x
        ) {
            GameController.instance.results.addScore();
            this.isPassed = true;
        }

        this.node.setPosition(
            this.node.position.x - this.velocity * dt,
            this.node.position.y,
            0,
        );
    }
}
