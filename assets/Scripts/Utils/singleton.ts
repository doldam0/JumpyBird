export function singleton<T extends { new (...args: any[]): {} }>(
    constructor: T,
) {
    let globalInstance: any;

    return class extends constructor {
        public static get instance(): any {
            return globalInstance;
        }

        constructor(...args: any[]) {
            super(...args);
            globalInstance = this;
        }
    };
}
