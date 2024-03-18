# Guesthouse Web Page - SAARStay Guesthouse

## Description

Welcome to the SAARStay Project! This is a simple website I'm building for SAARStay, a small guesthouse that's still in the planning phase. "Saar" means "island" in Estonian. As I live in the biggest island in Estonia, it feels like appropriate name. 

My goal is to make a website that's easy to use for both the guesthouse staff and guests. It will help with booking the house and getting feedback from guests. Since SAARStay isn't ready yet, this website is my first step in getting everything set up for when it opens. 

## Installation Instructions

To set the project up:

1. Run `npm install` to install all the necessary packages.
2. Set up a PostgreSQL database for handling the system's data.
3. Configure `.env` files in both the `client` and `server` directories, following the format provided in the `.env.example` files.

## Running the Project 
- Navigate to the client directory `cd client`.
- Run `npm run dev` to start the front-end.
- Navigate to the server directory `cd server`.
- Run `npm run dev` to start the back-end.

## Tests

For server-side testing:

- Execute tests using `npm run test`.
- For test coverage, use `npm run coverage` in the server directory.

For client-side testing:

- Execute tests using `npm run test:e2e`.


## Usage Instructions

The system is accessible to all users. The steps for using the system are as follows:

1. **Booking Management**:
   - **Create Bookings**: Add new bookings.
   - **Payment**: User can pay using credit card.
   - **Confirmation**: After payment, user can see the confirmation.
   - **Confirm/Cancel Bookings** (Admins Only): Confirm or cancel existing bookings.
2. **Feedback Management**:
   - **Submit Feedback**: Guests can provide feedback on their stay.
   - **View and Moderate Feedback**: Admins can view all feedback and moderate as needed.
3. **Room Availability Check**: Check the availability of rooms for specific dates.
4. **Email Notifications**:
   - **Booking Confirmation**: Automatically send email confirmations for bookings.

## Frontend Routes

The web application has 2 main routes:

- **Home (`/`)**: The main landing page.
- **Login (`/admin/login`)**: Page for admin login and directs admin to dashboard.


### Using Migration to Create an Admin User

Set the admin password in .env file. Run migration file for creating admin.

`npm run migration:run`

### Testing payment

Use following card data:

 - Card number: 4242 4242 4242 4242
 - Valid future date: like 12/34
 - Any three-digit CVC: like 123
 - Any five-digit area code: like 12345

Page is deployed here: [SAARStay Guesthouse](https://saarstay.bi5i76at7ni1s.eu-central-1.cs.amazonlightsail.com/)

Admin page is here: [Admin](https://saarstay.bi5i76at7ni1s.eu-central-1.cs.amazonlightsail.com/admin/login)
