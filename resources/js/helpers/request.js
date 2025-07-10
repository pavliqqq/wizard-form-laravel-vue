import { camelToSnake } from "./caseConverter.js";

export function createFormData(obj) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = camelToSnake(key);

        if (value === null) {
            formData.append(snakeKey, "");
        } else {
            formData.append(snakeKey, value);
        }
    }

    return formData;
}
