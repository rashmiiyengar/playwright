import { Page, expect } from "@playwright/test";

class DatePickerPage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calenderInput = this.page.getByPlaceholder("Form Picker");
    if (!this.page.isClosed()) {
      await calenderInput.click();
    } else {
      throw new Error("Page has been closed");
    }

    const dateToAssert = await this.selectDateIntheCalender(
      numberOfDaysFromToday
    );

    await expect(calenderInput).toHaveValue(dateToAssert);
  }

  async selectDatePickerWithRange(startDate: number, endDate: number) {
    const calenderInput = this.page.getByPlaceholder("Range Picker");
    if (!this.page.isClosed()) {
      await calenderInput.click();
    } else {
      throw new Error("Page has been closed");
    }

    const dateToAssertStartdate = await this.selectDateIntheCalender(startDate);

    const dateToAssertEndDate = await this.selectDateIntheCalender(endDate);

    const dateToAssert = `${dateToAssertStartdate} - ${dateToAssertEndDate}`;
    await expect(calenderInput).toHaveValue(dateToAssert);
  }

  private async selectDateIntheCalender(numberofDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberofDaysFromToday);
    const expectedDate = date.getDate().toString();

    const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calenderMonthandYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    const expectedMonthandYear = `${expectedMonthLong} ${expectedYear}`;

    while (!calenderMonthandYear.includes(expectedMonthandYear)) {
      await this.page.locator('nb-icon [data-name="chevron-right"]').click();
      calenderMonthandYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator(".day-cell.ng-star-inserted .cell-content")
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert;
  }
}

export default DatePickerPage;
