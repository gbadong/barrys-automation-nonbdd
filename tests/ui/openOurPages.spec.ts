import { test, expect } from '@playwright/test';

const env = 'sit' // could be dev, sit, uat, prod

const urls = [
    `https://${env}.barrys.com`,
    `https://${env}.barrys.com/the-lifestyle`,
    `https://${env}.barrys.com/booking`,
    `https://${env}.barrys.com/studio/denver`,
    `https://${env}.barrys.com/pricing/denver`,
    `https://${env}.barrys.com/schedule/denver`,
    `https://${env}.barrys.com/studios`,
];

test.describe(`Testing open our pages`, async() => {

    for (const url of urls) {
        test(`open page: ${url}`, async ({ page }) => {
            const responsePromise = page.waitForResponse(url);
            await page.goto(url);
            const response = await responsePromise;

            await expect(page).toHaveURL(url);
            console.log(`Page url: %s`, page.url());

            expect(response.status()).toBe(200);
            console.log(`Status code: %s\n`, response.status());
        });
    }
});