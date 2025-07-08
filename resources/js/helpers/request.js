import {toSnakeCase} from "../utils/caseConverter.js";

export function createFormData(obj) {
    const convertObj = toSnakeCase(obj);
    const formData = new FormData();

    for (const [key, value] of Object.entries(convertObj)) {
        formData.append(key, value);
    }

    return formData;
}
