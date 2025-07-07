export function toSnakeCase(obj) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [
            key.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`),
            val
        ])
    );
}
