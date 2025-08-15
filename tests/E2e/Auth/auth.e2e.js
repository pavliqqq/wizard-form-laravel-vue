import {expect, browser, $} from '@wdio/globals'
import {loginAsAdmin} from "../helpers/auth-helper.js";
import {expectErrorVisible, fillFormField} from "../utils/utils.js";

describe('Auth', () => {
    const inputValues = {
        email: 'admin@gmail.com',
        password: '12345'
    }

    let submitButton;
    beforeEach(async () => {
        await browser.url('/admin/login');
        await browser.deleteAllCookies();
        await browser.execute(() => sessionStorage.clear());

        submitButton = await $('[data-testid="submitButton"]');
        await submitButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Submit button not displayed at login page'
        });
    })

    it('logs in with valid credentials', async () => {
        await loginAsAdmin();

        expect(await browser.getUrl()).toContain('/all_members');
    })

    it('log outs from account', async() => {
        await loginAsAdmin();

        const logoutButton = await $('[data-testid="logoutButton"]')

        await logoutButton.waitForDisplayed({ timeout: 10000, timeoutMsg: 'Logout button not displayed after login' });
        await logoutButton.click();

        await logoutButton.waitForDisplayed({
            reverse: true,
            timeout: 10000,
            timeoutMsg: 'Logout button still visible after logout'
        });
    })

    it('shows error message if credentials are invalid', async () => {
        const inputInvalidValues = {
            ...inputValues,
            password: '54321'
        }

        await fillFormField(inputInvalidValues);

        await submitButton.click();

        await expectErrorVisible('email');
    })

    it('shows error message if user already authenticated', async () => {
        await loginAsAdmin();

        await browser.url('/admin/login');

        await fillFormField(inputValues);

        await submitButton.click();

        await expectErrorVisible('email');
    })

    it('shows error message if fields are empty', async() => {
        await submitButton.click();

        await expectErrorVisible('email');
        await expectErrorVisible('password');
    })
})

