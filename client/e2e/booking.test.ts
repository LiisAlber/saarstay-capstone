import { test, expect } from '@playwright/test';
import { fakeBooking } from 'utils/fakeData';

test.describe.serial('Booking Process', () => {

  test('Navigate to booking page and open booking form', async ({ page }) => {
    await page.goto('/');
    await page.click('button[type="submit"]');
    const formLocator = page.locator('.booking-form-container form');
    await expect(formLocator).toBeVisible();
  });


  test('Fill and submit booking form', async ({ page }) => {
    await page.goto('/booking/form');
    const bookingData = fakeBooking();
    const form = page.locator('.booking-form-container form');

    await form.locator('label:has-text("Guest Name") + div > input').fill(bookingData.guestName);
    await form.locator('label:has-text("Guest Email") + div > input').fill(bookingData.guestEmail);
    await form.locator('label:has-text("Contact Number") + div > input').fill(bookingData.guestContactNumber);
    await form.locator('label:has-text("Check-In Date") + div > input').fill(bookingData.checkInDate);
    await form.locator('label:has-text("Check-Out Date") + div > input').fill(bookingData.checkOutDate);
    await form.locator('label:has-text("Number of Guests") + div > input').fill(bookingData.numberOfGuests.toString());
    await form.locator('label:has-text("Special Requests") + div > input').fill(bookingData.specialRequests);

    // Extract bookingId and clientSecret from the actual URL
    const urlPattern = /\/booking\/payment\/([^/]+)\/([^/]+)/;

    // Prepare to wait for URL change
    const waitForURLPromise = page.waitForURL(urlPattern, { timeout: 20000 }); 

    // Submit the form
    await form.locator('button[type="submit"]').click();

    // Wait for the URL change to complete
    await waitForURLPromise;

    const actualUrl = page.url();

    const match = actualUrl.match(urlPattern);
    if (match) {
        const actualBookingId = match[1];
        const actualClientSecret = match[2];

        // Using actualBookingId and actualClientSecret for further assertions or actions
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
        await expect(bookingDetailsLocator).toContainText('Booking Confirmation');
      });
});