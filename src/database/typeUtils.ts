export function toBoolean(value?: string | number | boolean): boolean {
    if (!value) {
        return false;
    }
    const truthy = [true, "true", "1", 1, "yes", "y", "on"];

    if (typeof value === "string") {
        return truthy.includes(value.toLocaleLowerCase());
    }
    return truthy.includes(value);
}

export function toNumber(value?: string): number {
    if (!value) {
        return Number.NaN;
    }
    return Number.parseFloat(value);
}
