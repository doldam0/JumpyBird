import {
    Animation,
    BoxCollider2D,
    CCFloat,
    Collider2D,
    Component,
    Contact2DType,
    IPhysics2DContact,
    Input,
    KeyCode,
    Node,
    UITransform,
    _decorator,
    input,
} from 'cc';
import { GameController } from './GameController';
import { MyCanvas } from './Utils/Canvas';
import { lazy } from './Utils/lazy';
import { singleton } from './Utils/singleton';
const { ccclass, property } = _decorator;

@ccclass('Bird')
@singleton
export class Bird extends Component {
    @property({
        type: CCFloat,
        tooltip: 'The jump force',
    })
    public jumpForce: number = 450;

    @property({
        type: CCFloat,
        tooltip: 'The gravity',
    })
    public gravity: number = 0;

    @property({
        type: CCFloat,
        tooltip: 'The velocity',
    })
    public velocity: number = 0;

    @property({
        type: Node,
        tooltip: 'The ground',
    })
    public ground: Node;

    public static instance: Bird;

    @lazy private get height(): number {
        return this.getComponent(UITransform).height;
    }

    @lazy private get animation(): Animation {
        return this.getComponent(Animation);
    }
    private isAnimationPlaying: boolean = false;

    @lazy private get collider(): BoxCollider2D {
        return this.getComponent(BoxCollider2D);
    }

    protected onLoad(): void {
        // If the space key is pressed, the bird jumps
        input.on(
            Input.EventType.KEY_DOWN,
            (event) => {
                if (event.keyCode === KeyCode.SPACE) {
                    this.velocity = this.jumpForce;
                }
            },
            this,
        );

        this.animation.on(Animation.EventType.FINISHED, () => {
            this.animation.play();
        });

        this.collider.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContact,
            this,
        );
    }

    private onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null,
    ): void {
        console.log('onBeginContact');
        GameController.instance.gameOver();
    }

    protected update(dt: number): void {
        // Calculate the new velocity
        this.velocity -= this.gravity * dt;

        // Calculate the new position
        let y = this.node.position.y + this.velocity * dt;

        // If the bird is trying to go below the ground, stop it
        if (y < this.ground.position.y + this.height) {
            y = this.ground.position.y + this.height;
            this.velocity = 0;
            this.animation.pause();
            this.isAnimationPlaying = false;
        } else if (!this.isAnimationPlaying) {
            this.animation.play();
            this.isAnimationPlaying = true;
        }

        // If the bird is trying to go above the canvas, stop it
        if (y > MyCanvas.height / 2 - this.height) {
            y = MyCanvas.height / 2 - this.height;
            this.velocity = 0;
        }

        // Set the new position
        this.node.setPosition(this.node.position.x, y, 0);
    }
}
