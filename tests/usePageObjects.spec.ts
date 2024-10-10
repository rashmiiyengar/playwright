import { test, expect } from "@playwright/test";
import NavigationPage from "../page-objects/navigationPage";
import FormLayoutsPage from "../page-objects/formLayoutsPage";
import DatePickerPage from "../page-objects/datePickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
});

test("Parameterized methods", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayputPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayputPage.submitUsingTheGridFormWithCredsAndSelectOption(
    "test@test.com",
    "Welcome1",
    "Option 1"
  );
  await onFormLayputPage.submitUsingInlineForm("Rash", "test@test.com", false);

});


test("Date picker - select number of dates from today", async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.datePickerPage();

    const datePickerPage = new DatePickerPage(page);

    await datePickerPage.selectCommonDatePickerDateFromToday(7);
    
    await datePickerPage.selectDatePickerWithRange(7,14);
  });


