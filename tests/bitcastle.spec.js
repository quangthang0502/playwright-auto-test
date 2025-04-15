import { test, expect } from "@playwright/test";
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;
const LOGIN_PAGE_URL_PATTERN = /.*\/login.*/;
const LOGIN_USERNAME = process.env.LOGIN_USERNAME;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const MAGIC_CODE = process.env.MAGIC_CODE;

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
  const emailInput = page
    .locator("form")
    .filter({ hasText: "Email" })
    .locator(`input[type=text][maxlength="80"]`);
  console.log("Input", emailInput);

  await emailInput.fill(LOGIN_USERNAME);

  const passwordInput = page
    .locator("form")
    .filter({ hasText: "Password" })
    .locator(`input[type=password]`);

  await passwordInput.fill(LOGIN_PASSWORD);

  console.log("Submit login form.");
  const [request] = await Promise.all([
    page.waitForRequest((request) => request.url().includes("/user/login")),
    page.locator("form").getByRole("button", { name: "Login" }).click(),
  ]);

  const body = JSON.parse(request.postData() || "{}");
  await expect(body.email).toBe(LOGIN_USERNAME);
  await expect(body.password).toBe(LOGIN_PASSWORD);

  const response = await page.waitForResponse((response) =>
    response.url().includes("/user/login")
  );

  console.log("Response", response.status() === 400);
  if (response.status() === 200) {
    console.log("Check if redirected to futures page.");
    await expect(page).toHaveURL(/.*\/futures.*/, { timeout: 10000 });
    return;
  }

  console.log("Check 2FA step.");
  console.log(response.status());

  await expect(response.status()).toBe(400);

  // TODO next step
});
