import {test,expect} from '@playwright/test';

test.describe('Checkboxes',()=>{

    test.beforeEach(async({page})=>{
        await page.goto('/');

        await page.getByText('Modal & Overlays').click();

        await page.getByText('Toastr').click();
    })

    test('First test',async({page})=>{

        const hideOption= page.getByRole('checkbox',{name:"Hide on click"});
        await hideOption.uncheck({force:true});

        page.getByRole('checkbox',{name:"Prevent arising of duplicate toast"}).check({force:true});
    
        const allBoxes = page.getByRole('checkbox');

        for(const box of await allBoxes.all()){

            await box.check({force:true});
            expect(await box.isChecked()).toBeTruthy();

        }
    })

})