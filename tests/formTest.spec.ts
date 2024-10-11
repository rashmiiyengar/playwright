import {expect, test} from '@playwright/test';

test.describe('Form Spec @smoke',()=>{

    test.beforeEach(async({page})=>{
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('Locator syntax options',async ({page})=>{
        //Locator by tag name
        page.locator('input',{}).first().click();

        //Locator by id 
       await page.locator('#inputEmail1').click();

        //Locator by class value
        page.locator('.shape-rectangle')

        //Locator by attribute
        page.locator('[placeholder="Email"]');

        //Locator by entire class value
        page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

        //Combine different locators
        page.locator('input[placeholder="Email" && type="email"]');

        //by partial text match
        page.locator(':text("Using")');

        //by exact text match
        page.locator(':text-is("Using the grid');
    })

    test('Tests locating child elements',async({page})=>{
        await page.locator('nb-card nb-radio :text-is("Option 1")').click();

        await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click(); ///try avoiding this approach using first

        await page.locator('nb-card').nth(3).getByRole('button').click(); //try avoiding this approach
    })

    test('Tests locating parent elements',async({page})=>{
        
        await page.locator('nb-card',{hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).click();

        await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click();

        await page.locator('nb-card').filter({hasText:"Horizontal form"}).getByRole('textbox',{name:"Email"}).click();

        await page.locator(':text-is("Using the Grid")').locator("..").getByRole('textbox',{name:"Email"}).click();

    })

    test('Reuse the locators',async({page})=>{

        const basicForm = page.locator('nb-card').filter({hasText:"Basic form"});

        await basicForm.getByRole('textbox',{name:"Email"}).fill("test@test.com");
        await basicForm.getByRole('textbox',{name:"Password"}).fill("Welcome@123");
        await basicForm.locator('nb-checkbox').click();
        await basicForm.getByRole('button',{name:"Submit"}).click();

        await expect(basicForm.getByRole('textbox',{name:"Email"})).toHaveValue('test@test.com');
        
    })

    test('Extracting values',async({page})=>{

        //single text value
        const basicForm = page.locator('nb-card').filter({hasText:"Basic form"});
        const buttonText = await basicForm.locator('button').textContent();

        await expect(buttonText).toEqual('Submit');
        
        //all text values
        const allRadiobtnLabels= await page.locator('nb-radio').allTextContents();
        expect(allRadiobtnLabels).toContain("Option 2");

        //input value
        const emailFld = basicForm.getByRole('textbox',{name:"Email"});
        await emailFld.fill('test@test.com')

        const emailValue= await emailFld.inputValue();
        expect(emailValue).toEqual("test@test.com")

        
        const placeholderValue=emailFld.getAttribute('placeholder');
        await expect(placeholderValue).toEqual("Email");
    })
    
    test('Assertions',async({page})=>{

        const basicFormBtn = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button');

        //General Assertions
        const value =5;
        expect(value).toEqual(5);

        const text = await basicFormBtn.textContent();
        expect(text).toEqual('Submit');

        //LOcator assertions
        await expect(basicFormBtn).toHaveText('Submit');
        
        //Soft assertions
        await expect.soft(basicFormBtn).toHaveText('Submit5'); //not good practice to use soft assertions

        await basicFormBtn.click();

    })

    


})