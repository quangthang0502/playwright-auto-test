import { test, expect } from "@playwright/test";

const BASE_URL = "https:localhost:3000";
const LOGIN_PAGE_URL_PATTERN = /.*\/login.*/;
const LOGIN_USERNAME = "user";
const LOGIN_PASSWORD = "password";

test("has title", async ({ page }) => {
  await page.goto(`${BASE_URL}/futures/BTC_USDT`);

  console.log("Get login button.");
  const submitButton = page.getByRole("button", { name: "Login or Register" });

  console.log("Check if login button is visible.");
  await expect(submitButton).toBeVisible({ timeout: 10000 });

  console.log("Click login button.");
  await submitButton.click();

  console.log("Check if redirected to login page.");
  await expect(page).toHaveURL(LOGIN_PAGE_URL_PATTERN, { timeout: 10000 });

  console.log("Fill login form.");
  await page.getByRole("form").locator("input[type=text]").fill(LOGIN_USERNAME);

  await page
    .getByRole("form")
    .locator("input[type=password]")
    .fill(LOGIN_PASSWORD);

  // await page
  //   .locator(
  //     'input.has-label.has-value[type="password"][inputmode="text"][maxlength="50"]'
  //   )
  //   .fill(LOGIN_PASSWORD);

  // console.log("Submit login form.");
  // await page.locator("button[type=submit]").click();
  // console.log("Check if redirected to futures page.");
  // await expect(page).toHaveURL(/.*\/futures.*/);
});
