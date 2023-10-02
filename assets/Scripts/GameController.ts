import {
    _decorator,
    CCInteger,
    Component,
    director,
    Input,
    input,
    Label,
} from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { singleton } from './Utils/singleton';
const { ccclass, property } = _decorator;

@ccclass('GameController')
@singleton
export class GameController extends Component {
    @property({
        type: Results,
        tooltip: 'The component that controls the results',
    })
    public results: Results;

    @property({
        type: Label,
        tooltip: 'The press any key to start label',
    })
    public pressAnyKeyLabel: Label;

    @property({
        type: Ground,
        tooltip: 'The component that controls the ground',
    })
    public ground: Ground;

    @property({
        type: CCInteger,
        tooltip: 'The ground speed',
    })
    public groundSpeed: number = 300;

    @property({
        type: CCInteger,
        tooltip: 'The pipe speed',
    })
    public pipeSpeed: number = 200;

    public static instance: GameController;

    protected start(): void {
        this.resetGame();

        input.on(Input.EventType.KEY_DOWN, (event) => {
            this.startGame();
        });
    }

    public startGame(): void {
        this.results.hideResults();
        this.pressAnyKeyLabel.node.active = false;
        director.resume();
    }

    public gameOver(): void {
        this.results.showResults();
        director.pause();
    }

    public resetGame(): void {
        this.results.resetScore();
        this.pressAnyKeyLabel.node.active = true;
        director.pause();
    }
}
