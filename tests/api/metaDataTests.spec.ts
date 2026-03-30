import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import fs from 'fs';

// Read metadata from JSON file
const jsonPath = "test-data\\metadata.json";
const metadata:any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe('Testing metadata is correct', async() => {

    for (const {currentUrl, currentMetaTitle, currentMetaDescription} of metadata) {

        test(`get status code, title, meta description from "${currentUrl}"`, async ({ request }) => {
            const resp = await request.get(currentUrl);
            
            const html: string = await resp.text();
            const $ = cheerio.load(html);
            
            const title = $('title').text().trim();
            const metaDescription = $("meta[name='description']").attr('content');
            
            // verify status code is 200
            expect(resp.status()).toBe(200);
            
            // verify title is correct
            expect(title).toBeDefined();
            expect(title).toEqual(currentMetaTitle);

            // expect(title.length).toBeLessThanOrEqual(60);
            
            // verify meta description is correct
            expect(metaDescription).toBeDefined();
            expect(metaDescription).toEqual(currentMetaDescription);

            // expect(metaDescription.length).toBeLessThanOrEqual(160);
            
            console.log('Status code: %s\nTitle: %s\nMeta Description: %s\n', resp.status(), title, metaDescription);
        });
    };
});