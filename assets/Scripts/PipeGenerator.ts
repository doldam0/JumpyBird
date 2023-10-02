import { _decorator } from 'cc';
import { PrefabGenerator } from './Utils/PrefabGenerator';
const { ccclass, property } = _decorator;

@ccclass('PipeGenerator')
export class PipeGenerator extends PrefabGenerator {
    protected onLoad(): void {
        this.generate();
        this.schedule(this.generate.bind(this), 3);
    }
}
