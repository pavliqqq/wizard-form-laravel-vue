import {expect, $} from '@wdio/globals'
import {expectErrorVisible, fillFormField, inputFile} from '../utils/utils.js'
import {goToSecondStep} from "../helpers/form-helper.js";


describe('SecondStep', () => {
    let backButton;
    beforeEach(async () => {
        await goToSecondStep();

        backButton = await $('[data-testid="backButton"]')
        await backButton.waitForDisplayed({ timeout: 10000 });
    })

    it('moves to next step when all fields are empty', async () => {
        const nextButton = await $('[data-testid="nextButton"]');
        await nextButton.click();

        const startOverButton = await $('[data-testid="startOver"]')
        await startOverButton.waitForDisplayed({ timeout: 10000 });

        expect(await startOverButton.isDisplayed()).toBe(true);
    })

   it('shows errors when submitting form with invalid data', async() => {
       const inputInvalidValues = {
           company: 'T',
           position: 'P',
       }

       await fillFormField(inputInvalidValues);

       const aboutMe = await $('textarea[name="about_me"]');
       await aboutMe.setValue('a');

       // file size is more than limit
       await inputFile('../data/sun.png', 'photo');

       const nextButton = await $('[data-testid="nextButton"]');
       await nextButton.click();

       for (const name in inputInvalidValues) {
           await expectErrorVisible(name);
       }

       await expectErrorVisible('about_me');
       await expectErrorVisible('photo');
   })

    it('returns back to previous step', async() => {
        await backButton.click();

        await backButton.waitForDisplayed({ reverse: true, timeout: 10000 });

        expect(await backButton.isDisplayed()).toBe(false);
    })
})
