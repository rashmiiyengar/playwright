import { expect } from "@playwright/test";
import { test } from "../testOptions";

test("drap and drop ", async ({ page, globalQaUrl }) => {
  await page.goto(globalQaUrl);
});
