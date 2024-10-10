import { test, expect } from "@playwright/test";
import NavigationPage from "../page-objects/navigationPage";


test.describe("Forms layout page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    const navigateTo = new NavigationPage(page)
    await navigateTo.toolTipPage();
  });

  test("input fields", async ({ page }) => {
    const usingGridInputEmail = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingGridInputEmail.fill("test@test.com");
    await usingGridInputEmail.clear();
    await usingGridInputEmail.pressSequentially("test2@test.com", {
      delay: 500,
    }); //to delay to typing speed you can add additional delay

    //generic assertions
    const inputValue = await usingGridInputEmail.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    //locator assertions
    await expect(usingGridInputEmail).toHaveValue("test2@test.com");
  });

  test("Radio buttons", async ({ page }) => {
    const usingGridRadiobtn = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    //await usingGridRadiobtn.locator('nb-radio',{hasText:"Option 2"}).click({force:true});

    //await usingGridRadiobtn.getByLabel('Option1').check({force:true})
    await usingGridRadiobtn
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true }); //Most recommended way

    const radioStatus = await usingGridRadiobtn
      .getByRole("radio", { name: "Option 1" })
      .isChecked(); //generic assertion

    expect(radioStatus).toBeTruthy();
    await expect(
      usingGridRadiobtn.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    await usingGridRadiobtn
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    expect(
      await usingGridRadiobtn
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
    expect(
      await usingGridRadiobtn
        .getByRole("radio", { name: "Option 2" })
        .isChecked()
    ).toBeTruthy();
  });
});

test.describe("ui compoments advanced", () => {

    test.beforeEach(async ({ page })=>{
        await page.goto("http://localhost:4200/");
    })

  test("tooltip", async ({ page }) => {
    
    const navigateTo = new NavigationPage(page)
    await navigateTo.toolTipPage();

    const toolTipCard = page.locator("nb-card", {
      hasText: "Tooltip Placements",
    });
    await toolTipCard.getByRole("button", { name: "Top" }).hover();

    const tooltip = await page.locator("nb-tooltip").textContent();

    await expect(tooltip).toEqual("This is a tooltip");
  });

  test("Dialog box", async ({ page }) => {
   
    const navigateTo = new NavigationPage(page)
    await navigateTo.smartTablePage();

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });
    await page
      .getByRole("table")
      .locator("tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click();
    await expect(page.locator("table tr").first()).not.toHaveText(
      "mdo@gmail.com"
    );
  });

  test("Webtables", async ({ page }) => {
    
    const navigateTo = new NavigationPage(page)
    await navigateTo.smartTablePage();

    //get the row by any test in this row
    const targetrow = page.getByRole("row", { name: "twitter@outlook.com" });

    await targetrow.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("35");
    await page.locator(".nb-checkmark").click();

    //get the row based on value in specific column using id here
    await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
    const targetrowById = page
      .getByRole("row", { name: "11" })
      .filter({ has: page.locator("td").nth(1).getByText("11") });
    await targetrowById.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("70");
    await page.locator(".nb-checkmark").click();
    await expect(targetrowById.locator("td").nth(6)).toHaveText("70");

    //search for a particular property and get the results and validate it
    const ages = ["20", "30", "40", "200"];

    for (let age of ages) {
      await page.locator("input-filter").getByPlaceholder("Age").clear;
      await page.locator("input-filter").getByPlaceholder("Age").fill(age);
      await page.waitForTimeout(500);

      const ageRows = page.locator("tbody tr");
      for (let row of await ageRows.all()) {
        const cellValue = await row.locator("td").last().textContent();

        if(age == "200"){
            expect(await page.getByRole('table').textContent()).toContain('No data found')
        }else{
            expect(cellValue).toEqual(age);
        }
      }
    }
  });

  test('Date pickers',async({page})=>{

    const navigateTo = new NavigationPage(page)
    await navigateTo.datePickerPage();

    const calenderInput = page.getByPlaceholder('Form Picker');
    await calenderInput.click();

    let date = new Date();
    date.setDate(date.getDate() +29);
    const expectedDat = date.getDate().toString();
    
    //console.log(`Current date: ${expectedDat}`);

    const expectedMonthShort=  date.toLocaleString('En-US',{month:'short'});
    const expectedMonthLong=  date.toLocaleString('En-US',{month:'long'});
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDat}, ${expectedYear}`

    let calenderMonthandYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthandYear = `${expectedMonthLong} ${expectedYear}`

    while(!calenderMonthandYear.includes(expectedMonthandYear)){
        await page.locator('nb-icon [data-name="chevron-right"]').click();
        calenderMonthandYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    console.log(`calenderInput: ${calenderInput}`);
    console.log(`dateToAssert: ${dateToAssert}`);

    await page.locator('.day-cell.ng-star-inserted .cell-content')
    .getByText(expectedDat,{exact:true})
    .click();
    
    await expect(calenderInput).toHaveValue(dateToAssert);

  })

  test('Sliders',async({page})=>{
    //update attribute
    // const tempGage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    // await tempGage.evaluate((node)=>{
    //     node.setAttribute('cx','255.12504175871751')
    //     node.setAttribute('cy','232.6309883354377')
    // })
    // await tempGage.click();


    //Mouse movement
    const tempGuageMouse = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempGuageMouse.scrollIntoViewIfNeeded();

    const box = await tempGuageMouse.boundingBox();
    const x = box.x + box.width /2;
    const y = box.x + box.height /2;

    await page.mouse.move(x,y)
    await page.mouse.down();
    await page.mouse.move(x-100,y);
    await page.mouse.move(x-100,y+100);
    await page.mouse.up();

  })


});