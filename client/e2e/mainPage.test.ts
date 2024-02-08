import { test, expect } from '@playwright/test';

test.describe('Main Page Tests', () => {
  test('Google Maps link points to the correct URL', async ({ page }) => {
    await page.goto('/');

    // Wait for the Google Maps link to become visible
    const googleMapsLink = await page.waitForSelector('footer a[href*="maps.google.com"]');

    // Get the actual href attribute value of the Google Maps link
    const href = await googleMapsLink.getAttribute('href');

    // Verify that the href attribute points to the correct Google Maps location
    expect(href).toBe('https://maps.google.com/?q=Pärna+35,+Kuressaare,+Estonia');
  });

  test('Clicking feedback link opens the modal', async ({ page }) => {
    // Navigate to the main page
    await page.goto('/');
  
    // Click the feedback link
    await page.click('button.header-action >> text="Leave Feedback"');
  
    // Wait for the feedback modal to appear and check its visibility
    await page.waitForSelector('.feedback-form-container', { state: 'visible' });
    const feedbackModal = page.locator('.feedback-form-container');
    await expect(feedbackModal).toBeVisible();
  
  });

  test('Clicking cancel button redirects user to main page', async ({ page }) => {
    // Navigate to the booking form page
    await page.goto('/booking/form');

    // Click the cancel button
    await page.click('button[type="button"]');

    // Wait for the URL to change to the main page URL
    await page.waitForURL('/');

    // Verify that the URL path is now the main page URL path
    const currentUrl = page.url();
    const pathName = new URL(currentUrl).pathname; // Extract the path name from the URL
    expect(pathName).toBe('/'); // Compare the path names
});

test('Clicking the logo on header redirects user to main page', async ({ page }) => {
  // Navigate to the booking form page
  await page.goto('/booking/form');

  // Click the logo in the header
  await Promise.all([
    page.waitForURL('/'), // Wait for the navigation to complete
    page.click('img[alt="SAARstay Guesthouse Logo"]'), // Click the logo
  ]);
 
  // Verify that the URL path is now the main page URL path
  const currentUrl = page.url();
  const pathName = new URL(currentUrl).pathname; // Extract the path name from the URL
  expect(pathName).toBe('/'); // Compare the path names
});

});
