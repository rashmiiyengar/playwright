import { Locator, Page, expect } from "@playwright/test";

class FormLayoutsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * 
   * @param email 
   * @param password 
   * @param optionText 
   */

  async submitUsingTheGridFormWithCredsAndSelectOption(email: string,password: string, optionText: string ) 
  {
    const usingGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingGridForm.getByRole("textbox", { name: "Email" }).fill(email);

    await usingGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);

    await usingGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });

    await usingGridForm.getByRole("button").click();
  }

  /**
   * This method fill out the user details of inline form
   * @param name  should be first and last name
   * @param email valid email for test user
   * @param checkboxSelect  true or false
   */

  async submitUsingInlineForm(name:string,email:string,checkboxSelect:boolean){
    const usingInlineFormForm = this.page.locator("nb-card", {
        hasText: "Inline form",
      });

    await usingInlineFormForm.getByPlaceholder('Jane Doe').fill(name);
    await usingInlineFormForm.locator('nb-card-body [placeholder="Email"]').fill(email);

    if(checkboxSelect){
        await usingInlineFormForm.getByRole('checkbox').check({force:true});
        expect(await usingInlineFormForm.getByRole('checkbox')).toBeChecked();
    }
    await usingInlineFormForm.getByRole("button").click();
  }
}

export default FormLayoutsPage;
