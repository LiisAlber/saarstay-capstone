import sgMail from '@sendgrid/mail'
import config from '../../../config'

// Set SendGrid API key
sgMail.setApiKey(config.sendGrid.apiKey)

// Actual function to send the email
export const sendEmail = async (msg: sgMail.MailDataRequired) => sgMail.send(msg)

// Wrapper function
export const sendEmailWrapper = sendEmail
