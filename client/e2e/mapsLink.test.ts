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
});
