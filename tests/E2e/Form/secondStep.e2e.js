import {expect, $} from '@wdio/globals'
import {emptyFieldsCheck, expectErrorVisible, fillFormField, inputFile} from '../utils/utils.js'
import {goToSecondStep} from "../helpers/form-helper.js";


describe('Second step of form', () => {
    let backButton;
    beforeEach(async () => {
        await goToSecondStep();

        backButton = await $('[data-testid="backButton"]')
        await backButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Back button not displayed at second step of form'
        });
    })

    it('moves to next step when all fields are empty', async () => {
        const inputFields = ['company', 'position', 'photo'];
        const textAreaFields = ['about_me'];

        await emptyFieldsCheck(inputFields, 'input');
        await emptyFieldsCheck(textAreaFields, 'textArea');

        const nextButton = await $('[data-testid="nextButton"]');
        await nextButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Next button not displayed at second step of form'
        });

        await nextButton.click();

        const startOverButton = await $('[data-testid="startOver"]')
        await startOverButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Start over button not displayed at third step of form'
        });
    })

    it('shows errors when submitting form with invalid data', async () => {
        const inputInvalidValues = {
            company: 'T',
            position: 'P',
        }

        await fillFormField(inputInvalidValues);

        const aboutMe = await $('textarea[name="about_me"]');
        await aboutMe.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'About me textarea not displayed at second step of form'
        });

        await aboutMe.setValue('a');

        // file size is more than limit
        await inputFile('../data/sun.png', 'photo');

        const nextButton = await $('[data-testid="nextButton"]');
        await nextButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Next button not displayed at second step of form'
        });

        await nextButton.click();

        for (const name in inputInvalidValues) {
            await expectErrorVisible(name);
        }

        await expectErrorVisible('about_me');
        await expectErrorVisible('photo');
        expect(await nextButton.isDisplayed()).toBe(true);
    })

    it('returns back to previous step', async () => {
        await backButton.click();

        await backButton.waitForDisplayed({
            reverse: true,
            timeout: 10000,
            timeoutMsg: 'Back button still visible after click'
        });
    })
})
