import {$} from "@wdio/globals";
import {fillFormField} from "../utils/utils.js";

export async function loginAsAdmin() {
    await browser.url('/admin/login');
    const inputValues = {
        email: 'admin@gmail.com',
        password: '12345',
    };
    await fillFormField(inputValues);
    const submitButton = await $('[data-testid="submitButton"]');

    await submitButton.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'Submit button not displayed at login form'
    });
    await submitButton.click();

    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/all_members'),
        {
            timeout: 10000,
            timeoutMsg: 'Not redirected to /all_members'
        }
    );
}
