import {test,expect} from '@playwright/test';

test.describe('Forms layout page',()=>{

    test.beforeEach(async({page})=>{
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('input fields',async({page})=>{

        const usingGridInputEmail = page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"});

        await usingGridInputEmail.fill("test@test.com");
        await usingGridInputEmail.clear();
        await usingGridInputEmail.pressSequentially('test2@test.com',{delay:500}); //to delay to typing speed you can add additional delay


        //generic assertions
        const inputValue = await usingGridInputEmail.inputValue();
        expect(inputValue).toEqual('test2@test.com')

        //locator assertions
        await expect(usingGridInputEmail).toHaveValue('test2@test.com');

    })
    
    test('Radio buttons',async({page})=>{

        const usingGridRadiobtn = page.locator('nb-card',{hasText:"Using the Grid"});

        //await usingGridRadiobtn.locator('nb-radio',{hasText:"Option 2"}).click({force:true});

        //await usingGridRadiobtn.getByLabel('Option1').check({force:true})
        await usingGridRadiobtn.getByRole('radio',{name:"Option 1"}).check({force:true});//Most recommended way 

        const radioStatus =  await usingGridRadiobtn.getByRole('radio',{name:"Option 1"}).isChecked(); //generic assertion

        expect(radioStatus).toBeTruthy();
        await expect(usingGridRadiobtn.getByRole('radio',{name:"Option 1"})).toBeChecked();

        await usingGridRadiobtn.getByRole('radio',{name:"Option 2"}).check({force:true});
        expect(await usingGridRadiobtn.getByRole('radio',{name:"Option 1"}).isChecked()).toBeFalsy();
        expect(await usingGridRadiobtn.getByRole('radio',{name:"Option 2"}).isChecked()).toBeTruthy();

    })

    
})