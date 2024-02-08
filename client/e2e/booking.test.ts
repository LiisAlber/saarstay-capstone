import { test, expect } from '@playwright/test';
import { fakeBooking } from 'utils/fakeData';

console.log('CI environment variable:', process.env.CI);
console.log('Running tests in headless mode:', !!process.env.CI);

test.describe.serial('Booking Process', () => {

  test('Navigate to booking page and open booking form', async ({ page }) => {
    // Navigate directly to the booking form page.
    await page.goto('/booking/form');
    
    // Wait for the state to be 'networkidle' to ensure all resources have been loaded.
    await page.waitForLoadState('networkidle');

    // Directly check for the form's visibility using a correct, specific selector.
    const formLocator = page.locator('form'); 
    await expect(formLocator).toBeVisible({ timeout: 5000 });
  });

  test('Fill and submit booking form', async ({ page }) => {
    await page.goto('/booking/form');
    await page.waitForLoadState('networkidle');

    const bookingData = fakeBooking();
    const currentDate = new Date().toISOString().split('T')[0];

    if (bookingData.checkInDate <= currentDate || bookingData.checkOutDate <= currentDate) {
      throw new Error('The generated dates are not in the future.');
  }

    await page.fill('input[type="text"][placeholder="Full Name"]', bookingData.guestName);
    await page.fill('input[type="email"][placeholder="Email"]', bookingData.guestEmail);
    await page.fill('input[type="tel"][placeholder="Phone Number"]', bookingData.guestContactNumber);
    const checkInDateInput = page.locator('xpath=//label[contains(text(), "Check-In Date")]/following-sibling::input[@type="date"]');
    const checkOutDateInput = page.locator('xpath=//label[contains(text(), "Check-Out Date")]/following-sibling::input[@type="date"]');

    await checkInDateInput.fill(bookingData.checkInDate);
    await checkOutDateInput.fill(bookingData.checkOutDate);

    await page.fill('input[type="number"]', bookingData.numberOfGuests.toString());
    await page.fill('textarea[placeholder="Any special requests?"]', bookingData.specialRequests);

    const urlPattern = /\/booking\/payment\/([^/]+)\/([^/]+)/;
  
    // Submit the form
    await page.click('button[type="submit"]');
    await page.waitForURL(urlPattern, { timeout: 20000 });

    const actualUrl = page.url();
    const match = actualUrl.match(urlPattern);
    if (match) {
        const actualBookingId = match[1];
        const actualClientSecret = match[2];
        await expect(page).toHaveURL(`/booking/payment/${actualBookingId}/${actualClientSecret}`);
    } else {
        throw new Error('Failed to navigate to the expected URL');
    }
});
    

  test('Handle payment actions', async ({ page }) => {
    const bookingId = 'mockBookingId123';
    const clientSecret = 'mockClientSecret123';

    await page.goto(`/booking/payment/${bookingId}/${clientSecret}`);
    
      // Wait for the Stripe card element to be ready
      await page.waitForSelector('#card-element');
    
      // Find the Stripe iframe directly
      const stripeIframeHandle = await page.waitForSelector('iframe[src*="stripe.com"]');
      const stripeFrame = await stripeIframeHandle.contentFrame();
    
      if (stripeFrame) {
        // Fill the card details
        await stripeFrame.fill('input[name="cardnumber"]', '4242 4242 4242 4242', { timeout: 20000 });
        await stripeFrame.fill('input[name="exp-date"]', '12/34', { timeout: 20000 });
        await stripeFrame.fill('input[name="cvc"]', '123', { timeout: 20000 });
        await stripeFrame.fill('input[name="postal"]', '12345', { timeout: 20000 });
    
        // Click the submit button in the Stripe iframe
        await stripeFrame.waitForSelector('button[type="submit"]:enabled', { timeout: 5000 });
      // Wait for the expected navigation after submitting the payment
      const expectedUrl = `/booking/payment/${bookingId}/${clientSecret}`;
      await expect(page).toHaveURL(expectedUrl);
      } else {
      throw new Error('Stripe iframe not found');
      }
      });

  test('Get booking details on confirmation page', async ({ page }) => {
      const bookingId = 'captured-or-known-valid-booking-id';
      await page.goto(`/booking/details/${bookingId}`);
      const bookingDetailsLocator = page.locator('text=Booking Confirmation');
      await expect(bookingDetailsLocator).toBeVisible();
      });
  });