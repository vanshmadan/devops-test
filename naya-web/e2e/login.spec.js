const { test, expect } = require('@playwright/test');

test.describe('Naya Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should render login form inputs', async ({ page }) => {
    await expect(page.locator('input[placeholder="Username"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Your Favourite Color?")')).toBeVisible();
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
  });

  test('should prevent login without color', async ({ page }) => {
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    await page.click('button:has-text("Login")');

     await expect(page).toHaveURL(/\/explore/);
  });

  test('should allow login with valid details', async ({ page }) => {
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');

    // Open color picker
    await page.click('button:has-text("Your Favourite Color?")');

    // Click inside color picker (for example: top-left area to select a color)
    await page.click('.chrome-picker', { position: { x: 10, y: 10 } });

    // Click outside to close picker (like clicking body or another area)
    await page.mouse.click(0, 0);

    // Proceed with login
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/\/explore/);
});


});
