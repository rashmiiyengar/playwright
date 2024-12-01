import { Page, expect } from "@playwright/test";
import NavigationPage from "../page-objects/navigationPage";
import FormLayoutsPage from "../page-objects/formLayoutsPage";
import DatePickerPage from "../page-objects/datePickerPage";

class PageManager{

    private readonly page:Page;
    private readonly navigationPage:NavigationPage
    private readonly formLayoutPage:FormLayoutsPage
    private readonly datePickerPage:DatePickerPage

    constructor(page:Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage;
    }

    onFormsLayoutPage(){
        return this.formLayoutPage;
    }

    onDatepickerPage(){
        return this.datePickerPage;
    }
}

export default PageManager;