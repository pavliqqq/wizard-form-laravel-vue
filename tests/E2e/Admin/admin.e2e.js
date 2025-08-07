import {expect, browser, $} from '@wdio/globals'
import {fillFormField, inputFile, uniqueEmail} from "../utils/utils.js";
import {loginAsAdmin} from "../helpers/auth-helper.js";

describe('AdminFunctions', () => {
    const tableRowsSelector = 'table tbody tr';

    beforeAll(async () => {
        await loginAsAdmin();

        await browser.waitUntil(
            async () => (await $$(tableRowsSelector)).length > 0,
            {
                timeout: 10000,
                timeoutMsg: 'No members in table after login'
            }
        );
    })

    it('deletes member', async () => {
        const rowsBefore = await $$(tableRowsSelector);
        const countBefore = rowsBefore.length;

        const firstDeleteButton = await rowsBefore[0].$('[data-testid="delete-button"]');
        await firstDeleteButton.click();

        await browser.waitUntil(async () => {
            const rowsAfter = await $$(tableRowsSelector);
            return rowsAfter.length === countBefore - 1;
        }, {
            timeout: 10000,
            timeoutMsg: 'Member row count did not decrease'
        });

        const rowsAfter = await $$(tableRowsSelector);
        expect(rowsAfter.length).toBe(countBefore - 1);
    })

    it('toggles vision', async () => {
        const toggleVisibilityButton = await $('[data-testid="toggleVisibility-button"]');
        const buttonTextBefore = await toggleVisibilityButton.getText();
        await toggleVisibilityButton.click();

        await browser.waitUntil(async () => {
            const currentText = await toggleVisibilityButton.getText();
            return currentText !== buttonTextBefore;
        }, {
            timeout: 10000,
            timeoutMsg: 'Button text did not change after toggle'
        });

        const buttonTextAfter = await toggleVisibilityButton.getText();
        expect(buttonTextBefore).not.toBe(buttonTextAfter);
    })

    it('updates member', async () => {
        const editButton = await $('[data-testid="edit-button"]');
        await editButton.click();

        const updateButton = await $('[data-testid="updateButton"]')
        await updateButton.waitForDisplayed({ timeout: 5000 });

        const inputValues = {
            full_name: 'Eddie New',
            report_subject: 'Test subj',
            email: uniqueEmail()
        }

        await fillFormField(inputValues);
        await inputFile('../data/chrome.png', 'photo');

        const photoImg = await $('[data-testid="photo-img"]');
        const srcBefore = await photoImg.getAttribute('src');

        await updateButton.click();

        await browser.waitUntil(async () => {
            const rowText = await $(tableRowsSelector).getText();
            return Object.values(inputValues).every(value => rowText.includes(value))
        }, {
            timeout: 10000,
            timeoutMsg: 'Updated values not found in table row',
        });

        const srcAfter = await photoImg.getAttribute('src');
        expect(srcAfter).not.toBe(srcBefore);

        const rowText = await $(tableRowsSelector).getText();
        for (const name in inputValues) {
            expect(rowText).toContain(inputValues[name]);
        }
    })
})

