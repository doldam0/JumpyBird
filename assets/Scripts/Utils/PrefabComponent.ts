import { Component } from 'cc';

export class PrefabComponent extends Component {
    private onArchivedCallbacks: (() => void)[] = [];

    public onArchived(callback: () => void): void {
        this.onArchivedCallbacks.push(callback);
    }

    public archive(): void {
        this.onArchivedCallbacks.forEach((callback) => callback());
    }
}
