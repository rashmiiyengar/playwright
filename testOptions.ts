import {test as base} from '@playwright/test'


export type TestOptions ={

    globalQaUrl:string;
}

export const test = base.extend<TestOptions>({
    globalQaUrl:[
        '',{option:true}
    ]
})