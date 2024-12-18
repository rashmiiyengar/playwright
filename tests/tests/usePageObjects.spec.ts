import { test } from "@playwright/test";
import PageManager from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Navigate to form page @smoke @regression", async ({ page }) => {
  const pm = new PageManager(page);
  pm.navigateTo();
  await pm.navigateTo().formLayoutsPage();
});

test("Parameterized methods @smoke", async ({ page }) => {
  const randomFullName = faker.person.fullName();
  const ramdomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    100
  )}@test.com`;

  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();

  await pm
    .onFormsLayoutPage()
    .submitUsingTheGridFormWithCredsAndSelectOption(
      "test@test.com",
      "Welcome1",
      "Option 1"
    );

  await pm
    .onFormsLayoutPage()
    .submitUsingInlineForm(randomFullName, ramdomEmail, true);
});

test("Date picker - select number of dates from today got range @smoke", async ({
  page,
}) => {
  const pm = new PageManager(page);
  await pm.navigateTo().datePickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(7);
  await page.screenshot({ path: "screenshots/formlayoutpage.png" });
  const buffer = await page.screenshot();

  await page
    .getByPlaceholder("Form Picker")
    .screenshot({ path: "screenshots/FormComponent1.png" });
  //screenshot for a particular component only

  await pm.onDatepickerPage().selectDatePickerWithRange(0, 7);
});

test("Date picker - select number of dates from today ", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().datePickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(7);
  await page.screenshot({ path: "screenshots/formlayoutpage.png" });
  const buffer = await page.screenshot();

  await page
    .getByPlaceholder("Range Picker")
    .screenshot({ path: "screenshots/FormComponent1.png" });
  //screenshot for a particular component only

  await pm.onDatepickerPage().selectDatePickerWithRange(7, 14);
});
