import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
import { PrefabComponent } from './PrefabComponent';
const { ccclass, property } = _decorator;

@ccclass('PrefabGenerator')
export abstract class PrefabGenerator extends Component {
    @property({
        type: Prefab,
        tooltip: 'The target prefab of the pool',
    })
    public prefab: Prefab;

    private pool: NodePool = new NodePool();

    protected generate(): Node {
        if (this.pool.size() == 0) {
            const prefab = instantiate(this.prefab);
            const prefabComponent = prefab.getComponent(PrefabComponent);
            if (prefabComponent === null) {
                throw new Error('Prefab must have a PrefabComponent');
            }
            prefabComponent.onArchived(() => {
                this.pool.put(prefab);
                prefab.active = false;
            });
            this.pool.put(prefab);
        }

        const node = this.pool.get();
        this.node.addChild(node);
        node.active = true;
        return node;
    }
}
