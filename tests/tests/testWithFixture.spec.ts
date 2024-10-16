import { test } from "../testOptions";
import PageManager from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test("Parameterized methods", async ({ pageManager }) => {
  const randomFullName = faker.person.fullName();
  const ramdomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    100
  )}@test.com`;

  await pageManager
    .onFormsLayoutPage()
    .submitUsingTheGridFormWithCredsAndSelectOption(
      "test@test.com",
      "Welcome1",
      "Option 1"
    );

  await pageManager
    .onFormsLayoutPage()
    .submitUsingInlineForm(randomFullName, ramdomEmail, true);
});
