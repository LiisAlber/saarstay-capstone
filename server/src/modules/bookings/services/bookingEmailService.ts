import { sendEmail } from './sendGridService'

export interface BookingDetails {
  guestName: string
  guestEmail: string
  checkInDate: Date
  checkOutDate: Date
  numberOfGuests: number
  guestContactNumber?: string
  specialRequests?: string
}

export const sendBookingConfirmationEmail = async (bookingDetails: BookingDetails) => {
  // Format dates for readability
  const formattedCheckInDate = bookingDetails.checkInDate.toLocaleDateString()
  const formattedCheckOutDate = bookingDetails.checkOutDate.toLocaleDateString()

  // Construct the email content
  const emailText =
    `Dear ${bookingDetails.guestName},\n\n` +
    `Thank you for your booking. Here are your booking details:\n` +
    `Check-In Date: ${formattedCheckInDate}\n` +
    `Check-Out Date: ${formattedCheckOutDate}\n` +
    `Number of Guests: ${bookingDetails.numberOfGuests}\n` +
    `${
      bookingDetails.guestContactNumber
        ? `Contact Number: ${bookingDetails.guestContactNumber}\n`
        : ''
    }` +
    `${
      bookingDetails.specialRequests ? `Special Requests: ${bookingDetails.specialRequests}\n` : ''
    }` +
    `\nWe look forward to welcoming you!`

  const emailHtml =
    `<strong>Dear ${bookingDetails.guestName},</strong><br><br>` +
    `<p>Thank you for your booking. Here are your booking details:</p>` +
    `<ul>` +
    `<li>Check-In Date: ${formattedCheckInDate}</li>` +
    `<li>Check-Out Date: ${formattedCheckOutDate}</li>` +
    `<li>Number of Guests: ${bookingDetails.numberOfGuests}</li>` +
    `${
      bookingDetails.guestContactNumber
        ? `<li>Contact Number: ${bookingDetails.guestContactNumber}</li>`
        : ''
    }` +
    `${
      bookingDetails.specialRequests
        ? `<li>Special Requests: ${bookingDetails.specialRequests}</li>`
        : ''
    }` +
    `</ul>` +
    `<p>We look forward to welcoming you!</p>`

  // Email options
  const emailOptions = {
    to: bookingDetails.guestEmail,
    from: 'liislepanurm@gmail.com',
    subject: 'Booking Confirmation',
    text: emailText,
    html: emailHtml,
  }

  // Send the email
  await sendEmail(emailOptions)
}
