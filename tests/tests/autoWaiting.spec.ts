import { test, expect } from "@playwright/test";

test.describe.skip("Auto wait", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL);
    await page.getByText("Button Triggering AJAX Request").click();
  });

  test("Auto waiting", async ({ page }) => {
    const successBtn = page.locator(".bg-success");
    await successBtn.click();
    await successBtn.waitFor({ state: "attached" });
    const textData = await successBtn.allTextContents();
    expect(textData).toContain("Data loaded with AJAX get request.");

    await expect(successBtn).toHaveText("Data loaded with AJAX get request.", {
      timeout: 20000,
    });
  });

  test("alternative waiting", async ({ page }) => {
    const successBtn = page.locator(".bg-success");
    await page.waitForResponse(process.env.URL);

    const textData = await successBtn.allTextContents();

    await expect(successBtn).toHaveText("Data loaded with AJAX get request.");
  });

  test("timeouts", async ({ page }) => {
    test.slow();
    const successBtn = page.locator(".bg-success");

    await successBtn.click();
  });
});
