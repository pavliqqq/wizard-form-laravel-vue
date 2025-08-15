import {browser, $} from '@wdio/globals'
import {goToThirdStep} from "../helpers/form-helper.js";
import {waitForHref, waitForUrlContains} from "../utils/utils.js";


describe('Third step of form', () => {
    beforeEach(async () => {
        await goToThirdStep();
    })

    it('shares on facebook', async () => {
        const facebookLink = await $('[data-testid="facebookLink"]');
        await waitForHref(facebookLink);

        await facebookLink.click();

        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);

        await waitForUrlContains('/sharer');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('shares on twitter', async () => {
        const twitterLink = await $('[data-testid="twitterLink"]');
        await waitForHref(twitterLink);

        await twitterLink.click();

        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);

        await waitForUrlContains('/post');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('starts over', async () => {
        const startOverButton = await $('[data-testid="startOver"]');
        await startOverButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Start over button not displayed at third step of form'
        });

        await startOverButton.click();

        await waitForUrlContains('/form');
    });

    it('redirects to all members', async () => {
        const allMembersLink = await $('[data-testid="allMembersLink"]');
        await allMembersLink.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'All members link not displayed at third step of form'
        });

        await allMembersLink.click();

        await waitForUrlContains('/all_members');
    });
})
