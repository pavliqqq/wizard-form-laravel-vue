import {$, browser, expect} from "@wdio/globals";
import path from "path";
import {fileURLToPath} from "url";

export function uniqueEmail() {
    return `${Date.now()}@gmail.com`;
}

export async function fillFormField(values) {
    for (const name in values) {
        const input = await $(`input[name="${name}"]`);
        await input.waitForDisplayed({ timeout: 10000, timeoutMsg: `Input "${name}" not displayed` });

        await input.clearValue();
        await input.setValue(values[name]);
    }
}

export async function emptyFieldsCheck(fieldNames, type){
    for(const name of fieldNames){
        const field = await $(`${type}[name="${name}"]`);
        await field.waitForDisplayed({ timeout: 10000, timeoutMsg: `${type} "${name}" not displayed` });

        const fieldValue = await field.getValue();
        expect(fieldValue).toBe('');
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function inputFile(relativePath, fileInputName){
    const fullFilePath = path.join(__dirname, relativePath);
    const remoteFilePath = await browser.uploadFile(fullFilePath);

    const fileInput = await $(`input[name="${fileInputName}"]`);
    await fileInput.waitForExist({ timeout: 10000, timeoutMsg: `File input "${fileInputName}"does not exists` });

    await fileInput.setValue(remoteFilePath);
}

export async function expectErrorVisible(name) {
    const error = await $(`[data-testid="${name}-error"]`);
    await error.waitForDisplayed({ timeout: 10000, timeoutMsg: `Error message for "${name}" not displayed` });

    const errorText = await error.getText();

    expect(errorText.length).toBeGreaterThan(0);
}

export async function waitForHref(element) {
    await browser.waitUntil(
        async () => Boolean(await element.getAttribute('href')),
        {
            timeout: 10000,
            timeoutMsg: `${element} href did not populate`
        }
    );
    return element;
}

export async function waitForUrlContains(substring) {
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes(substring),
        {
            timeout: 15000,
            timeoutMsg: `URL did not contain "${substring}"`
        }
    );
    const url = await browser.getUrl();
    expect(url).toContain(substring);
}
