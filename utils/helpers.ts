import { expect, Page } from "@playwright/test";

export async function openPage(page: Page, env: string, url_extension: string) {
    const baseUrl = `https://${env}.barrys.com`;
    const url = `${baseUrl}${url_extension}`;
    const responsePromise = page.waitForResponse(url);
    await page.goto(url);
    const response = await responsePromise;
    return response;
}

export async function emptyCart(page: Page) {
    const cartButton = page.locator("a[data-test-button=\"cart\"]");
    await cartButton.isVisible();
    await cartButton.click();
    const h1Text = await page.locator("h1").innerText();
    expect(h1Text).toEqual('Checkout');
    
    while(await page.locator("button:has-text('Remove')").isVisible()) {
        const removeButtons = page.locator("button:has-text('Remove')");
        await removeButtons.click();
    }

    await page.click("button:has-text('Back to Buy Page')");
}

export async function loginToMT(page: Page, email: string, password: string) {
    await page.locator("#id_username").isVisible();
    await page.locator("#id_password").isVisible();
    
    await page.locator("#id_username").fill(email);
    await page.locator("#id_password").fill(password);
    await page.click("button:has-text('Log in')");
}