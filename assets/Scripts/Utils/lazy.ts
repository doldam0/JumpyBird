export function lazy(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) {
    let value: any;
    const getter = descriptor.get;
    descriptor.get = function () {
        if (!value) {
            value = getter.bind(this)();
        }
        return value;
    };
}
