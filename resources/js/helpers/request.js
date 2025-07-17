import { camelToSnake } from "./caseConverter.js";

export function createFormData(obj) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = camelToSnake(key);
        appendFormData(formData, value, snakeKey);
    }

    return formData;
}

function appendFormData(formData, value, key) {
    if (value instanceof File) {
        formData.append(key, value);
    } else if (value instanceof Array) {
        value.forEach((item, index) => {
            const newKey = `${key}[${index}]`;
            appendFormData(formData, item, newKey);
        });
    } else if (typeof value === "object") {
        for (const [objKey, item] of Object.entries(value)) {
            const snakeKey = camelToSnake(objKey);

            const newKey = `${key}[${snakeKey}]`;
            appendFormData(formData, item, newKey);
        }
    } else {
        formData.append(key, value === null ? "" : value);
    }
}
