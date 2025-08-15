import {browser, $} from '@wdio/globals'
import {expectErrorVisible, fillFormField, uniqueEmail} from '../utils/utils.js'
import {loadFirstStepForm} from "../helpers/form-helper.js";

describe('First step of form', () => {
    let inputValues = {
        first_name: 'Peter',
        last_name: 'Parker',
        birthdate: '01-01-1990',
        report_subject: 'Spiders',
        phone: '+380636566123'
    }

    let nextButton;
    beforeEach(async () => {
        inputValues = {
            ...inputValues,
            email: uniqueEmail(),
        }
       nextButton = await loadFirstStepForm();
    })

    it('moves to next step when all fields valid', async() => {
        await fillFormField(inputValues);

        await nextButton.click();

        const backButton = await $('[data-testid="backButton"]');
        await backButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Back button not displayed at second step of form'
        });
    })

    it('shows errors when required fields are empty', async () => {
        await nextButton.click();

        for (const name in inputValues) {
            await expectErrorVisible(name);
        }
    })

    it('shows error when submitting duplicate email', async() => {
        await fillFormField(inputValues);

        const newEmail = await $('input[name="email"]');
        await newEmail.waitForDisplayed({ timeout: 10000, timeoutMsg: `Email input not displayed` });

        const newEmailValue = await newEmail.getValue();

        await nextButton.click();

        await browser.waitUntil(async () => {
            const email = await browser.execute(() => localStorage.getItem("email"));
            return email === newEmailValue;
        }, {
            timeout: 10000,
            timeoutMsg: 'LocalStorage has no email field',
        });

        await browser.execute(() => localStorage.clear());
        await browser.url('/form');

        const newInputValues = { ...inputValues, email: newEmailValue }
        await fillFormField(newInputValues);

        await nextButton.click();

        await expectErrorVisible('email');
    })
})
