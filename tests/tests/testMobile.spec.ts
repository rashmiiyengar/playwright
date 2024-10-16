import { test } from "@playwright/test";

test("input fields", async ({ page }) => {
  await page.goto("/");

  await page.locator(".sidebar-toggle").click();
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
  await page.getByText("Forms").click();
  const usingGridInputEmail = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });

  await usingGridInputEmail.fill("test@test.com");
  await usingGridInputEmail.clear();
  await usingGridInputEmail.pressSequentially("test2@test.com"); //to delay to typing speed you can add additional delay
});
