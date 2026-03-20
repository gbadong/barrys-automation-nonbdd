import { test, expect } from '@playwright/test';
import { openPage, emptyCart, loginToMT } from '../../utils/helpers';
import dotenv from 'dotenv';

dotenv.config();

const env = 'dev' // could be dev, sit, uat, prod


test.describe('Booking flow for returning users', () => {
    test('/booking page', async ({ page }) => {
        const response = await openPage(page, `${env}`, '/booking');
        expect(response.status()).toBe(200);    
    });

    // test('/studio page - book your first class button', async ({ page }) => {
    //     const response = await openPage(page, `${env}`, '/studio/denver');
    //     expect(response.status()).toBe(200);

    //     await page.locator("div[class='flex cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-neutral-100 bg-white py-3.5 pl-4 min-[260px]:pr-6'].first()").click();
    //     const h1 = await page.locator("h1").innerText();
    //     expect(h1).toEqual('Book your First Class or Log In');
    //     await page.click("button:has-text('Returning User')");

    // });

    test('/studio page - returning user button', async ({ page }) => {
        const response = await openPage(page, `${env}`, '/studio/denver');
        expect(response.status()).toBe(200);

        await page.locator('#barrys-booking').contentFrame().getByText('Denver - 1 Class$34.00 USD').click()
        const buttonClick1 = page.locator("locator('iframe').first().contentFrame().getByRole('heading', { name: 'Book your First Class or Log' })");
        await expect(buttonClick1).toBeVisible();
        await page.locator('iframe').first().contentFrame().getByRole('button', { name: 'RETURNING USER' }).click();

        await loginToMT(page, process.env.MT_EMAIL!, process.env.MT_PASSWORD!);

        await expect(page.locator("div[class$='eUWnHj']")).toBeVisible();

        await emptyCart(page);

    });

    test('/pricing page', async ({ page }) => {
        const response = await openPage(page, `${env}`, '/pricing/denver');
        expect(response.status()).toBe(200);
    });

    test('/schedule page', async ({ page }) => {
        const response = await openPage(page, `${env}`, '/schedule/denver');
        expect(response.status()).toBe(200);
    });
});