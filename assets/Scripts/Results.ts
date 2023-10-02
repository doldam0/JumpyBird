import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label,
        tooltip: 'The label that shows the score',
    })
    public currentScoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'The label that shows the best score',
    })
    public bestScoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'The label that shows teh text "Try Again?"',
    })
    public tryAgainLabel: Label;

    private bestScore: number = 0;
    private currentScore: number = 0;

    protected onLoad(): void {
        this.hideResults();
    }

    public updateScore(score: number) {
        this.currentScore = score;
        this.currentScoreLabel.string = score.toString();
    }

    public resetScore() {
        this.updateScore(0);
        this.hideResults();
    }

    public addScore() {
        this.updateScore(this.currentScore + 1);
    }

    public showResults() {
        this.bestScore = Math.max(this.bestScore, this.currentScore);
        this.bestScoreLabel.string = `High Score: ${this.bestScore}`;

        this.bestScoreLabel.node.active = true;
        this.tryAgainLabel.node.active = true;
    }

    public hideResults() {
        this.bestScoreLabel.node.active = false;
        this.tryAgainLabel.node.active = false;
    }
}
