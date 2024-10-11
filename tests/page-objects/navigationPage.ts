import { Locator, Page } from "@playwright/test";
import HelperBase from "./helperBase";
class NavigationPage extends HelperBase {
  
  readonly formLayoutsMenuItem : Locator;
  readonly datePickerMenuItem : Locator;
  readonly smartTableMenuItem : Locator;
  readonly toastrMenuItem : Locator;
  readonly toolTipMenuItem : Locator;

  constructor(page: Page) {
    super(page);
    
    this.formLayoutsMenuItem = this.page.getByText('Form Layouts');
    this.datePickerMenuItem = this.page.getByText("Datepicker")
    this.toastrMenuItem= this.page.getByText("Toastr");
    this.toolTipMenuItem = this.page.getByText("Tooltip");
    this.smartTableMenuItem = this.page.getByText("Smart Table");
  }

  async toastrPage() {
    await this.selectGrpMenuItem('Modal & Overlays');
    await this.toastrMenuItem.click();
    await this.waitForNumberOfSeconds(2);
  }

  async datePickerPage() {
    await this.selectGrpMenuItem('Forms');
    await this.datePickerMenuItem.click();
  }

  async formLayoutsPage() {
    await this.selectGrpMenuItem('Forms');
    await this.formLayoutsMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGrpMenuItem('Tables & Data');
    await this.smartTableMenuItem.click();
  }

  async toolTipPage() {
    await this.selectGrpMenuItem('Modal & Overlays');
    await this.toolTipMenuItem.click();
  }

  private async selectGrpMenuItem(groupItemTitle:string){
    const grpMenuItem = this.page.getByTitle(groupItemTitle)
    console.log(grpMenuItem)
    const expandedState =await grpMenuItem.getAttribute('aria-expanded');
    if(expandedState == "false"){
        await grpMenuItem.click();
    }

  }
}

export default NavigationPage;