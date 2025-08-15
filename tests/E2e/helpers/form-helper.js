import {$} from "@wdio/globals";
import {fillFormField, uniqueEmail} from "../utils/utils.js";

export async function loadFirstStepForm() {
    await browser.url('/form');
    await browser.execute(() => localStorage.clear());
    await browser.refresh();

    const nextButton = await $('[data-testid="nextButton"]');
    await nextButton.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'Next button not displayed at first step of form'
    });

    await browser.waitUntil(
        async () => (await nextButton.isDisplayed()),
        {
            timeout: 5000,
            timeoutMsg: 'Form did not load in time',
        }
    );

    return nextButton;
}

export async function goToSecondStep(){
    const nextButton = await loadFirstStepForm();

    const inputValues = {
        first_name: 'Peter',
        last_name: 'Parker',
        birthdate: '01-01-1990',
        report_subject: 'Spiders',
        phone: '+380636566123',
        email: uniqueEmail(),
    }

    await fillFormField(inputValues);

    await nextButton.click();
}

export async function goToThirdStep(){
    await goToSecondStep();

    const backButton = await $('[data-testid="backButton"]')
    await backButton.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'Back button not displayed at second step of form'
    });

    const nextButton = await $('[data-testid="nextButton"]')
    await nextButton.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'Next button not displayed at second step of form'
    });

    await nextButton.click();
}
