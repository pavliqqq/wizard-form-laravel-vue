export function camelToSnake(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function camelToSnakeObj(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        result[camelToSnake(key)] = value;
    }
    return result;
}
