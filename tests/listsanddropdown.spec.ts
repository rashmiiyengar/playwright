import {test,expect} from '@playwright/test';

test.describe('lists and dropdowns',()=>{

    test.beforeEach(async({page})=>{
        await page.goto('/');
    })

    test('list dropdown choose cosmic listoption and validate',async({page})=>{

        const dropdownMenu = page.locator('ngx-header nb-select');

        await dropdownMenu.click();

        page.getByRole('list'); //can be used when the list has UL tag
        page.getByRole('listitem'); //when list has li tag

        //const optionList = page.getByRole('list').locator('nb-option');
        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"]);

        await optionList.filter({hasText:"Cosmic"}).click();
        
        const header = page.locator('nb-layout-header');
        await expect(header).toHaveCSS('background-color','rgb(50, 50, 89)');

    })

    test('from list slect each option and validate',async({page})=>{

        const dropdownMenu = page.locator('ngx-header nb-select');
        await dropdownMenu.click();

        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"]);

        const header = page.locator('nb-layout-header');
        
        const colors={
            "Light":"rgb(255, 255, 255)",
            "Dark":"rgb(34, 43, 69)",
            "Cosmic":"rgb(50, 50, 89)",
            "Corporate":"rgb(255, 255, 255)"
        }

        await dropdownMenu.click();
        for(const color in colors ){
            if(color != "Corporate")
              await dropdownMenu.click();
            
            await optionList.filter({hasText:color}).click();
            await expect(header).toHaveCSS('background-color',colors[color])
            
        }


    })

    

})