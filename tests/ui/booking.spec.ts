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

    test('/studio page - returning user button', async ({ page }) => {await page.locator('#barrys-booking').contentFrame().getByText('Denver - 1 Class$34.00 USD').click();
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

        await page.locator('iframe').first().contentFrame().getByRole('button', { name: 'RETURNING USER' }).click();
        await page.goto('https://barrysbootcamp.marianatek.com/auth/login/?next=/o/authorize/%3Fclient_id%3DsbLziNCoF5HcOhkSV6zRL8O7betwd3mDDIQbWZa3%26domain%3Dhttps%253A%252F%252Fbarrysbootcamp.marianatek.com%26scope%3Dread%253Aaccount%26response_type%3Dcode%26response_mode%3Dquery%26state%3DYWN0aW9uPXJlZGlyZWN0JnJlZGlyZWN0VXJpPWh0dHBzJTNBJTJGJTJGd3d3LmJhcnJ5cy5jb20lMkZib29raW5nJTNGX210JTNEJTI1MkZidXklMjUyRjk3NjYlMjUzRmFjdGl2ZVNlY3Rpb24lMjUzRDM3NTElMjUyNmxvZ2luJTI1M0R0cnVlJTI2YWN0aXZlRGF0ZSUzRDIwMjYtMDMtMjAlMjZhY3RpdmVTZWN0aW9uJTNEMzc1MSUyNmZsb3clM0RyZXR1cm5pbmclMjZsb2NhdGlvbiUzRDk3NjYlMjZsb2dpbiUzRHRydWUlMjZzb3VyY2VQYXRoJTNEJTI1MkZwcmljaW5n%26nonce%3DLX8v6iuZdaKQHiAeZMQiA21RRniD_AN8UowWfndDuKm%26redirect_uri%3Dhttps%253A%252F%252Fbarrysbootcamp.marianaiframes.com%252Fiframe%252Fcallback%252F%26password_reset_redirect_uri%3Dhttps%253A%252F%252Fwww.barrys.com%252Fbooking%253F_mt%253D%25252Fbuy%25252F9766%25253FactiveSection%25253D3751%252526login%25253Dtrue%2526activeDate%253D2026-03-20%2526activeSection%253D3751%2526flow%253Dreturning%2526location%253D9766%2526login%253Dtrue%2526sourcePath%253D%25252Fpricing%26code_challenge%3D_F3jWP_gPNre9f-buRdT9Sl5Q0w94eLh8mXlEhCsN9w%26code_challenge_method%3DS256');
        await loginToMT(page, process.env.MT_EMAIL!, process.env.MT_PASSWORD!);

        await page.goto('https://www.barrys.com/booking?_mt=%2Fbuy%2F9766%3FactiveSection%3D3751%26login%3Dtrue&activeDate=2026-03-20&activeSection=3751&flow=returning&location=9766&login=true&sourcePath=%2Fpricing');
        await page.locator('iframe[name="__zoid__mt_integrations__eyJ1aWQiOiJ6b2lkLW10LWludGVncmF0aW9ucy1kYWIwNzAxZjczX210ZTZtamc2bXpjIiwiY29udGV4dCI6ImlmcmFtZSIsInZlcnNpb24iOiI5XzBfMzciLCJjaGlsZERvbWFpbiI6Imh0dHBzOi8vYmFycnlzYm9vdGNhbXAubWFyaWFuYWlmcmFtZXMuY29tIiwicGFyZW50RG9tYWluIjoiaHR0cHM6Ly93d3cuYmFycnlzLmNvbSIsInRhZyI6Im10LWludGVncmF0aW9ucyIsInBhcmVudCI6eyJ0eXBlIjoicGFyZW50IiwiZGlzdGFuY2UiOjB9LCJwcm9wcyI6eyJ0eXBlIjoicmF3IiwidmFsdWUiOiJ7XCJhdXRoVG9rZW5cIjp7XCJleHBpcmVzXCI6bnVsbCxcInRva2VuRGF0YVwiOntcImFjY2Vzc1Rva2VuXCI6bnVsbCxcInJlZnJlc2hUb2tlblwiOm51bGwsXCJleHBpcmVzSW5cIjpudWxsLFwidG9rZW5UeXBlXCI6bnVsbCxcInNjb3BlXCI6bnVsbH19LFwiY3JlYXRlUmVhY2hJZGVudGlmaWNhdGlvblwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwiODQ1NmFkNmNlM19tdGU2bWpnNm16Y1wiLFwibmFtZVwiOlwiY3JlYXRlUmVhY2hJZGVudGlmaWNhdGlvblwifX0sXCJldmVudHNcIjp7fSxcImd0bUlkXCI6XCJHVE0tVFJOTkI3S1wiLFwiaGFzQnJlYWRjcnVtYnNcIjp0cnVlLFwiaXNBdXRoZW50aWNhdGVkXCI6ZmFsc2UsXCJpZnJhbWVQb3NpdGlvblwiOjAsXCJpZnJhbWVIZWlnaHRcIjo3MjAsXCJpbml0aWFsUm91dGVcIjpcIi9jYWxsYmFjaz9jb2RlPUplUG5oU3oyQXlKbWd0TVFVTURUbDRtZVNWS1l4QiZzdGF0ZT1ZV04wYVc5dVBXeHZaMmx1Sm5KbFpHbHlaV04wVlhKcFBTVXlSbUoxZVNVeVJqazNOallsTTBaaFkzUnBkbVZUWldOMGFXOXVKVE5FTXpjMU1TVXlObXh2WjJsdUpUTkVkSEoxWlNaMGNtRnVjMkZqZEdsdmJrdGxlVDFaVjA0d1lWYzVkVkJZU214YVIyeDVXbGRPTUVwdVNteGFSMng1V2xkT01GWllTbkJRVjJnd1pFaENla3BVVGtKS1ZFcEhTbFJLUjJRelpETk1iVXBvWTI1S05XTjVOV3BpTWpCc1RXdGFhV0l5T1hKaFZ6VnVTbFJPUjFneU1UQktWRTVGU2xSSk1VMXJXbWxrV0d0c1RXcFZlVkpxYXpOT2FsbHNUV3BWZWxKdFJtcGtSMnd5V2xaT2JGa3pVbkJpTWpSc1RXcFZlbEpFVFROT1ZFVnNUV3BWZVU1dGVIWmFNbXgxU2xSSk1VMHdVakJqYmxac1NsUkpNbGxYVGpCaFdGcHNVa2RHTUZwVFZYcFNSRWwzVFdwWmRFMUVUWFJOYWtGc1RXcGFhRmt6VW5Ca2JWWlVXbGRPTUdGWE9YVktWRTVGVFhwak1VMVRWWGxPYlZwellqTmpiRTB3VW5sYVdGSXhZMjAxY0dKdFkyeE5hbHB6WWpKT2FHUkhiSFppYVZWNlVrUnJNMDVxV1d4TmFscHpZakprY0dKcFZYcFNTRko1WkZkVmJFMXFXbnBpTTFaNVdUSldVVmxZVW05S1ZFNUZTbFJKTVUxclduZGpiV3hxWVZjMWJnPT1cIixcImlzUmVzaXppbmdcIjpmYWxzZSxcImlzQ2FwdHVyZVVUTVBhcmFtc0FjdGl2ZVwiOmZhbHNlLFwibXRMb2NhbFN0b3JhZ2VcIjpudWxsLFwibXRTZXNzaW9uU3RvcmFnZVwiOm51bGwsXCJvbkF1dGhlbnRpY2F0ZWRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcIjc4YThjOGRjZjFfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uQXV0aGVudGljYXRlZFwifX0sXCJvbkNsZWFyVHJhbnNhY3Rpb25cIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcImQ4ODliMTUyMTZfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uQ2xlYXJUcmFuc2FjdGlvblwifX0sXCJvbkRhdGFMYXllclB1c2hcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcIjJhY2EyNWVmZWFfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uRGF0YUxheWVyUHVzaFwifX0sXCJvblRyYWNrRXZlbnRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcIjQ2ODEwYjFkYjZfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uVHJhY2tFdmVudFwifX0sXCJvbkdldEFjY291bnRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcImVlNDQyYmQyZGVfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uR2V0QWNjb3VudFwifX0sXCJvbkxvY2F0aW9uU2VsZWN0ZWRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcImE1NWFjMzNkYmFfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uTG9jYXRpb25TZWxlY3RlZFwifX0sXCJvbkxvZ291dFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwiOWY1MmRmMDUwZF9tdGU2bWpnNm16Y1wiLFwibmFtZVwiOlwib25Mb2dvdXRcIn19LFwib25SZWRpcmVjdFJlcXVlc3RcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcIjdiM2RlYjE1NzFfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uUmVkaXJlY3RSZXF1ZXN0XCJ9fSxcIm9uUm91dGVDaGFuZ2VcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcImI4YjFlMWJkZmVfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm9uUm91dGVDaGFuZ2VcIn19LFwib25UcmFuc2FjdGlvbkdlbmVyYXRlZFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwiNTkyZGRiMDk1NV9tdGU2bWpnNm16Y1wiLFwibmFtZVwiOlwib25UcmFuc2FjdGlvbkdlbmVyYXRlZFwifX0sXCJwYXJlbnRIZWlnaHRcIjowLFwicGFyZW50TG9jYXRpb25cIjpcImh0dHBzOi8vd3d3LmJhcnJ5cy5jb20vYm9va2luZz9fbXQ9JTJGY2FsbGJhY2slM0Zjb2RlJTNESmVQbmhTejJBeUptZ3RNUVVNRFRsNG1lU1ZLWXhCJTI2c3RhdGUlM0RZV04wYVc5dVBXeHZaMmx1Sm5KbFpHbHlaV04wVlhKcFBTVXlSbUoxZVNVeVJqazNOallsTTBaaFkzUnBkbVZUWldOMGFXOXVKVE5FTXpjMU1TVXlObXh2WjJsdUpUTkVkSEoxWlNaMGNtRnVjMkZqZEdsdmJrdGxlVDFaVjA0d1lWYzVkVkJZU214YVIyeDVXbGRPTUVwdVNteGFSMng1V2xkT01GWllTbkJRVjJnd1pFaENla3BVVGtKS1ZFcEhTbFJLUjJRelpETk1iVXBvWTI1S05XTjVOV3BpTWpCc1RXdGFhV0l5T1hKaFZ6VnVTbFJPUjFneU1UQktWRTVGU2xSSk1VMXJXbWxrV0d0c1RXcFZlVkpxYXpOT2FsbHNUV3BWZWxKdFJtcGtSMnd5V2xaT2JGa3pVbkJpTWpSc1RXcFZlbEpFVFROT1ZFVnNUV3BWZVU1dGVIWmFNbXgxU2xSSk1VMHdVakJqYmxac1NsUkpNbGxYVGpCaFdGcHNVa2RHTUZwVFZYcFNSRWwzVFdwWmRFMUVUWFJOYWtGc1RXcGFhRmt6VW5Ca2JWWlVXbGRPTUdGWE9YVktWRTVGVFhwak1VMVRWWGxPYlZwellqTmpiRTB3VW5sYVdGSXhZMjAxY0dKdFkyeE5hbHB6WWpKT2FHUkhiSFppYVZWNlVrUnJNMDVxV1d4TmFscHpZakprY0dKcFZYcFNTRko1WkZkVmJFMXFXbnBpTTFaNVdUSldVVmxZVW05S1ZFNUZTbFJKTVUxclduZGpiV3hxWVZjMWJnJTI1M0QlMjUzRCZhY3RpdmVEYXRlPTIwMjYtMDMtMjAmYWN0aXZlU2VjdGlvbj0zNzUxJmZsb3c9cmV0dXJuaW5nJmxvY2F0aW9uPTk3NjYmbG9naW49dHJ1ZSZzb3VyY2VQYXRoPSUyRnByaWNpbmdcIixcInBhcmVudFNjcm9sbFRvXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJjMDgzMzYyMDAyX210ZTZtamc2bXpjXCIsXCJuYW1lXCI6XCJwYXJlbnRTY3JvbGxUb1wifX0sXCJwYXJlbnRXaWR0aFwiOjEyODAsXCJyZWZlcnJlclwiOlwiXCIsXCJzY3JvbGxQb3NpdGlvblwiOjAsXCJzZXROb3RpZmljYXRpb25cIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcIjAzM2JjNTViNTBfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcInNldE5vdGlmaWNhdGlvblwifX0sXCJzdGlja3lIZWFkZXJIZWlnaHRcIjowLFwidGVzdGFibGVGZWF0dXJlRmxhZ3NcIjpbXSxcInRyYW5zYWN0aW9uc1wiOntcIllXTjBhVzl1UFhKbFpHbHlaV04wSm5KbFpHbHlaV04wVlhKcFBXaDBkSEJ6SlROQkpUSkdKVEpHZDNkM0xtSmhjbko1Y3k1amIyMGxNa1ppYjI5cmFXNW5KVE5HWDIxMEpUTkVKVEkxTWtaaWRYa2xNalV5UmprM05qWWxNalV6Um1GamRHbDJaVk5sWTNScGIyNGxNalV6UkRNM05URWxNalV5Tm14dloybHVKVEkxTTBSMGNuVmxKVEkyWVdOMGFYWmxSR0YwWlNVelJESXdNall0TURNdE1qQWxNalpoWTNScGRtVlRaV04wYVc5dUpUTkVNemMxTVNVeU5tWnNiM2NsTTBSeVpYUjFjbTVwYm1jbE1qWnNiMk5oZEdsdmJpVXpSRGszTmpZbE1qWnNiMmRwYmlVelJIUnlkV1VsTWpaemIzVnlZMlZRWVhSb0pUTkVKVEkxTWtad2NtbGphVzVuXCI6e1wiY29kZVZlcmlmaWVyXCI6XCJlREZEV1FKRkFKNlQuYUVTbWRreFFUNjlWUkYzUWZPZnNDNmRuemguME9mXCIsXCJub25jZVwiOlwiTFg4djZpdVpkYUtRSGlBZVpNUWlBMjFSUm5pRF9BTjhVb3dXZm5kRHVLbVwiLFwic2NvcGVcIjpcInJlYWQ6YWNjb3VudFwifX19In0sImV4cG9ydHMiOiJ7XCJpbml0XCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCIzNWI2MjRlYmU0X210ZTZtamc2bXpjXCIsXCJuYW1lXCI6XCJyXCJ9fSxcImNsb3NlXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCI5YmZlYzhkMTU0X210ZTZtamc2bXpjXCIsXCJuYW1lXCI6XCJjbG9zZVwifX0sXCJjaGVja0Nsb3NlXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJiNmJmZDE5YTFlX210ZTZtamc2bXpjXCIsXCJuYW1lXCI6XCJjaGVja0Nsb3NlXCJ9fSxcInJlc2l6ZVwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwiZDkwMzMxYzlhM19tdGU2bWpnNm16Y1wiLFwibmFtZVwiOlwicmVzaXplXCJ9fSxcIm9uRXJyb3JcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcImM4MTliNDEwMDZfbXRlNm1qZzZtemNcIixcIm5hbWVcIjpcIm5cIn19LFwic2hvd1wiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwiNWM1YjhlYzJiNV9tdGU2bWpnNm16Y1wiLFwibmFtZVwiOlwic2hvd1wifX0sXCJoaWRlXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCIyOGIwODJmM2U1X210ZTZtamc2bXpjXCIsXCJuYW1lXCI6XCJoaWRlXCJ9fX0ifQ==__"]').contentFrame().getByRole('button', { name: 'Accept All Cookies' }).click();
        
    });

    test('/schedule page', async ({ page }) => {
        const response = await openPage(page, `${env}`, '/schedule/denver');
        expect(response.status()).toBe(200);
    });
});