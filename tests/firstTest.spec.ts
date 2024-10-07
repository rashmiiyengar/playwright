import {test} from '@playwright/test';

test.describe('test suite 1 ',()=>{

    test.beforeEach(async({page})=>{
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
    })

    test('First test',async ({page})=>{
        await page.getByText('Form Layouts').click();
    })

    test('Navigate to date picker page',async ({page})=>{
        await page.getByText('Datepicker').click();
    })

})

