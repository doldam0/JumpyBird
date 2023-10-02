import * as cc from 'cc';

export class MyCanvas {
    private static get scene(): cc.Scene {
        return cc.director.getScene();
    }

    public static get instance(): cc.Canvas {
        return this.scene.getComponentInChildren(cc.Canvas);
    }

    private static get transform(): cc.UITransform {
        return this.instance.getComponent(cc.UITransform);
    }

    public static get width(): number {
        return this.transform.width;
    }

    public static get height(): number {
        return this.transform.height;
    }

    public static get top(): number {
        return -this.height / 2;
    }

    public static get bottom(): number {
        return this.height / 2;
    }

    public static get left(): number {
        return -this.width / 2;
    }

    public static get right(): number {
        return this.width / 2;
    }
}
