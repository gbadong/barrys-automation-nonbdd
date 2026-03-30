import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import fs from 'fs';

// Read metadata from JSON file
const jsonPath = "test-data\\localization.json";
const localization:any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe('Testing localization is correct', async() => {
    const env = 'sit';
    const baseUrl = `https://${env}.barrys.com/`;

    for (const {country, languageExtension } of localization) {
        test(`get status code, page url from "${baseUrl + languageExtension}"`, async ({ request }) => {
            const urlToUse = baseUrl + languageExtension;
            const resp = await request.get(urlToUse);
            
            const html: string = await resp.text();
            const $ = cheerio.load(html);
            
            // verify status code is 200
            expect(resp.status()).toBe(200);
            
            console.log('${urlToUse} Status code: %s\n', resp.status());
        });

        test('verify change country is giving correct url', async ({ page }) => {
            const urlToUse = baseUrl + languageExtension;
            await page.goto(urlToUse);
            
            // Click on the country selector and select the country
            await page.click('div[role="region"][aria-label="Website language selector"] div[role="button"]');
            await page.click(`text=${country}`);    

            //verify the url is correct after changing country
            await expect(page).toHaveURL(urlToUse);
        });
    };
});