// @ts-check
import { test, expect } from '@playwright/test';
import { devices } from '@playwright/test';

test.describe('Browser, Context and Page examples', () => {
  test('demonstrate browser, context and page hierarchy', async ({ browser }) => {
    // Browser is the top-level object that represents a browser instance
    console.log('Browser name:', browser.browserType().name());

    // Create a new browser context
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'Custom User Agent'
    });
    console.log('Created new browser context');

    // Create multiple pages within the same context
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    console.log('Created two pages in the same context');

    // Demonstrate that pages share the same context
    await page1.goto('https://playwright.dev/');
    await page2.goto('https://playwright.dev/docs/browsers');
    
    // Set a cookie in the context - it will be available to all pages
    await context.addCookies([{
      name: 'test-cookie',
      value: 'test-value',
      domain: 'playwright.dev',
      path: '/'
    }]);

    // Verify cookie is available in both pages
    const cookies1 = await page1.context().cookies();
    const cookies2 = await page2.context().cookies();
    console.log('Cookies in page1:', cookies1);
    console.log('Cookies in page2:', cookies2);

    // Demonstrate page-specific operations
    await page1.setViewportSize({ width: 800, height: 600 });
    await page2.setViewportSize({ width: 1024, height: 768 });

    // Clean up
    await page1.close();
    await page2.close();
    await context.close();
  });

  test('demonstrate isolated contexts', async ({ browser }) => {
    // Create two separate contexts
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    // Create a page in each context
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Demonstrate contexts are isolated
    await page1.goto('https://playwright.dev/');
    await page2.goto('https://playwright.dev/docs/browsers');

    // Set different cookies in each context
    await context1.addCookies([{
      name: 'context1-cookie',
      value: 'value1',
      domain: 'playwright.dev',
      path: '/'
    }]);

    await context2.addCookies([{
      name: 'context2-cookie',
      value: 'value2',
      domain: 'playwright.dev',
      path: '/'
    }]);

    // Verify cookies are isolated between contexts
    const cookies1 = await context1.cookies();
    const cookies2 = await context2.cookies();
    console.log('Context1 cookies:', cookies1);
    console.log('Context2 cookies:', cookies2);

    // Clean up
    await context1.close();
    await context2.close();
  });

  test('test responsive behavior with iPhone 11', async ({ browser }) => {
    // Create a new context with iPhone 11 device emulation
    const context = await browser.newContext({
      ...devices['iPhone 11'],
      locale: 'en-US',
      timezoneId: 'America/New_York',
    });

    const page = await context.newPage();
    
    // Navigate to a website
    await page.goto('https://playwright.dev/');
    
    // Get viewport size
    const viewport = page.viewportSize();
    console.log('Viewport size:', viewport);
    
    // Take a screenshot of the mobile view
    await page.screenshot({ path: 'iphone11-view.png' });
    
    // Test some responsive elements
    const isMobileMenuVisible = await page.locator('button[aria-label="Menu"]').isVisible();
    console.log('Is mobile menu visible:', isMobileMenuVisible);
    
    // Verify the page is in mobile view
    expect(viewport?.width).toBe(414); // iPhone 11 width
    expect(viewport?.height).toBe(896); // iPhone 11 height
    
    // Clean up
    await context.close();
  });

  test('test across different browser engines', async ({ playwright }) => {
    // Test in Chromium
    const chromium = await playwright.chromium.launch();
    const chromiumContext = await chromium.newContext();
    const chromiumPage = await chromiumContext.newPage();
    await chromiumPage.goto('https://www.csszengarden.com/220/');
    console.log('Chromium browser:', await chromiumPage.evaluate(() => navigator.userAgent));
    await chromiumPage.screenshot({ path: 'images/chromium-view.png' });
    await chromiumContext.close();
    await chromium.close();

    // Test in Firefox
    const firefox = await playwright.firefox.launch();
    const firefoxContext = await firefox.newContext();
    const firefoxPage = await firefoxContext.newPage();
    await firefoxPage.goto('https://www.csszengarden.com/220/');
    console.log('Firefox browser:', await firefoxPage.evaluate(() => navigator.userAgent));
    await firefoxPage.screenshot({ path: 'images/firefox-view.png' });
    await firefoxContext.close();
    await firefox.close();

    // Test in WebKit (Safari)
    const webkit = await playwright.webkit.launch();
    const webkitContext = await webkit.newContext();
    const webkitPage = await webkitContext.newPage();
    await webkitPage.goto('https://www.csszengarden.com/220/');
    console.log('WebKit browser:', await webkitPage.evaluate(() => navigator.userAgent));
    await webkitPage.screenshot({ path: 'images/webkit-view.png' });
    await webkitContext.close();
    await webkit.close();
  });
}); 