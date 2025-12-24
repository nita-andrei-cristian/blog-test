// Asta e un test cu playwright/test. nu jest
import {test, expect} from '@playwright/test'
import {autoScroll} from './utils/scroll.js'

test("Voi prelua link uri in homepage default", async({page})=>{
  await page.goto("http://localhost:5173/", {waitUntill : "networkidle"});

  const links = await page.$$eval('a', as => as.map(a=> a.href))

  console.log(links)
})

const LINKS_TO_TEST = [ 'http://localhost:5173/login', 'http://localhost:5173/user' ]

test.describe("Testare vizuala pagini blog", () => {
  for (const url of LINKS_TO_TEST) {
    test(`Pagina ar trebui sa arate corect: ${url}`, async ({ page }) => {
      await page.goto(url, { waitUntil: "networkidle" });

      await autoScroll(page);

      const slug = url.split("/").filter(Boolean).pop();

      await expect(page).toHaveScreenshot(`${slug}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01, 
      });
    });
  }
});


