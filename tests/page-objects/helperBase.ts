import { Page } from "@playwright/test";

class HelperBase {
 readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeinSeconds: number) {
    await this.page.waitForTimeout(timeinSeconds * 1000)
  }


}


export default HelperBase;