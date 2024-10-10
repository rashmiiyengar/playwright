import { test } from "@playwright/test";
import PageManager from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Navigate to form page", async ({ page }) => {
    const pm = new PageManager(page);
    pm.navigateTo();
    await pm.navigateTo().formLayoutsPage();
});

test("Parameterized methods", async ({ page }) => {
    const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();

  await pm.onFormsLayoutPage().submitUsingTheGridFormWithCredsAndSelectOption(
    "test@test.com",
    "Welcome1",
    "Option 1"
  );
  await pm.onFormsLayoutPage().submitUsingInlineForm("Rash", "test@test.com", false);

});


test("Date picker - select number of dates from today", async ({ page }) => {

    const pm = new PageManager(page);
    await pm.navigateTo().datePickerPage();
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(7);
    await pm.onDatepickerPage().selectDatePickerWithRange(7,14);

  });


