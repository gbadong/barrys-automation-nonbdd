import { test, expect } from '@playwright/test';
import { openPage } from '../../utils/helpers';

const env = 'sit' // could be dev, sit, uat, prod

const urls = [
    `/`,
    `/the-lifestyle`,
    `/booking`,
    `/studios`,

    `/studio/denver`,
    `/pricing/denver`,
    `/schedule/denver`,

    `/studio/castro`,
    `/pricing/castro`,
    `/schedule/castro`,

    `/studio/burlingame`,
    `/pricing/burlingame`,
    `/schedule/burlingame`,

    `/studio/fidi`,
    `/pricing/fidi`,
    `/schedule/fidi`,

    `/studio/san-francisco-marina`,
    `/pricing/san-francisco-marina`,
    `/schedule/san-francisco-marina`,
    
    `/studio/palo-alto`,
    `/pricing/palo-alto`,
    `/schedule/palo-alto`,
    
    `/studio/santana-row`,
    `/pricing/santana-row`,
    `/schedule/santana-row`,
    
    `/studio/walnut-creek`,
    `/pricing/walnut-creek`,
    `/schedule/walnut-creek`,
];

test.describe(`Testing open our pages`, async() => {

    for (const url of urls) {
        test(`open page: ${url}`, async ({ page }) => {
            const response = await openPage(page, env, url);

            await expect(page).toHaveURL(`https://${env}.barrys.com${url}`);
            console.log(`Page url: %s`, page.url());

            expect(response.status()).toBe(200);
            console.log(`Status code: %s\n`, response.status());
        });
    }
});