import { test } from "../testOptions";
import PageManager from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";


test("Parameterized methods", async ({ page,formLayoutPage }) => {
  const randomFullName = faker.person.fullName();
  const ramdomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    100
  )}@test.com`;

  const pm = new PageManager(page);
  //await pm.navigateTo().formLayoutsPage();

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

