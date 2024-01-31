# Guesthouse Web Page

## Description

Welcome to the SAARStay Project! This is a simple website I'm building for SAARStay, a small guesthouse that's still in the planning phase. "Saar" means "island" in Estonian. As I live in the biggest island in Estonia, it feels like appropriate name. 

My goal is to make a website that's easy to use for both the guesthouse staff and guests. It will help with booking the house, getting feedback from guests, and showing information about the guesthouse's location. Since SAARStay isn't ready yet, this website is my first step in getting everything set up for when it opens. For more details on the project, check out the Wiki section. 

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

- Execute tests using `npm run test:db`.
- For test coverage, use `npm run coverage` in the server directory.

## Usage Instructions

The system is accessible to all users. The steps for using the system are as follows:

1. **Booking Management**:
   - **Create Bookings**: Add new bookings.
   - **Payment**: User can pay using credit card.
   - **Confirmation**: After payment, user can see the confirmation.
   - **Confirm/Cancel Bookings** (Admins Only): Confirm or cancel existing bookings.
   - **View Bookings**: Admins can view all bookings.
2. **Feedback Management**:
   - **Submit Feedback**: Guests can provide feedback on their stay.
   - **View and Moderate Feedback**: Admins can view all feedback and moderate as needed.
4. **Location Management** (Admins Only): Manage and update location data related to the guesthouse. In future more rentable places can be added.
5. **Room Availability Check**: Check the availability of rooms for specific dates.
6. **Email Notifications**:
   - **Booking Confirmation**: Automatically send email confirmations for bookings.


## Frontend Routes

The web application has several routes, each serving a different purpose:

- **Home (`/`)**: The main landing page.
- **Login (`/admin/login`)**: Page for admin login.
- **Booking Form (`/booking/form`)**: Page for filling out the booking form.
- **Payment (`/booking/payment/:bookingId/:clientSecret`)**: Page displaying payment details.
- **Booking Details (`/booking/details/:bookingId`)**: Page displaying details of a booking.

## Backend API Endpoints

For backend testing, you can use tools like Insomnia or Postman. Below are some of the API endpoints available:

1. **Submit Feedbacks**:

   - **Procedure**: `feedback.submit`
   - **Method**: POST
   - **Endpoint**: `http://localhost:3000/v1/trpc/feedback.submit`
   - **Description**: Allows users to submit feedback for a particular booking.

### Request Payload

```json
{
  "path": "feedback.submit",
  "json": {
    "comment": "Thanks!",
    "rating": 5,
    "bookingId": 1,
    "userId": 1
  }
}
```

2. **View Feedbacks**:
   - **Procedure**: `feedback.view`
   - **Endpoint**: `GET http://localhost:3000/v1/trpc/feedback.view`
   - **Description**: Shows all feedbacks to the user.

3. **Admin Booking View**:
   - **Procedure**: `bookings.admin.bookingView`
   - **Endpoint**: `GET http://localhost:3000/v1/trpc/bookings.admin.bookingView`
   - **Payload Example**:
   ```json
   {
      "bookingId": 1
   }
   ```
   - **Authentication**: To access this endpoint, authentication is required. In Insomnia, select 'Bearer Token' as the Auth type and enter the token provided upon admin login. 
   - **Headers Example**:
     - **Authorization**: In the Headers section, create a new header with the key `Authorization` and the value `<YOUR_TOKEN>`, replacing `<YOUR_TOKEN>` with the actual bearer token you received from the authentication response.
   - **Description**: This endpoint allows admins to view all booking details. It requires authorization via a bearer token to ensure that only authorized users can access this data.

4. **Admin Booking Cancel**:
   - **Procedure**: `bookings.admin.cancelBooking`
   - **Endpoint**: `POST http://localhost:3000/v1/trpc/bookings.admin.cancelBooking`
   - **Authentication**: This endpoint requires an authenticated admin user. In Insomnia, you will need to set the Auth type to 'Bearer Token' and provide the token received upon admin login.
   - **Headers Example**:
     - **Authorization**: Set this header with the value `<YOUR_ADMIN_TOKEN>`, replacing `<YOUR_ADMIN_TOKEN>` with the actual bearer token you have obtained.
   - **Payload Example**:
   ```json
   {
      "bookingId": 1
   }
   ```
   - **Description**: This endpoint allows admins to cancel a booking. It requires a JSON payload with the `bookingId` of the booking to be confirmed. The request must be accompanied by an authorization header with a valid bearer token to ensure secure access.

5. **Admin Booking Confirm**:
   - **Procedure**: `bookings.admin.confirmBooking`
   - **Endpoint**: `POST http://localhost:3000/v1/trpc/bookings.admin.confirmBooking`
   - **Authentication**: This endpoint requires an authenticated admin user. In Insomnia, you will need to set the Auth type to 'Bearer Token' and provide the token received upon admin login.
   - **Headers Example**:
     - **Authorization**: Set this header with the value `<YOUR_ADMIN_TOKEN>`, replacing `<YOUR_ADMIN_TOKEN>` with the actual bearer token you have obtained.
   - **Payload Example**:
   ```json
   {
      "bookingId": 1
   }
   ```
   - **Description**: This endpoint allows admins to confirm a booking. It requires a JSON payload with the `bookingId` of the booking to be confirmed. The request must be accompanied by an authorization header with a valid bearer token to ensure secure access.

6. **Admin Feedback View**:
   - **Procedure**: `feedback.admin.adminView`
   - **Endpoint**: `GET http://localhost:3000/v1/trpc/feedback.admin.adminView`
   - **Authentication**: To access this endpoint, authentication is required. In Insomnia, select 'Bearer Token' as the Auth type and enter the token provided upon admin login. 
   - **Headers Example**:
     - **Authorization**: In the Headers section, create a new header with the key `Authorization` and the value `Bearer <YOUR_ADMIN_TOKEN>`, replacing `<YOUR_ADMIN_TOKEN>` with the actual bearer token you received from the authentication response.
   - **Description**: This endpoint allows admins to view all feedback submissions. No payload is necessary for this GET request. It requires authorization via a bearer token to ensure that only authorized users can view the feedback data.

7. **Admin Create Location**:
   - **Procedure**: `bookings.admin.createLocation`
   - **Endpoint**: `POST http://localhost:3000/v1/trpc/bookings.admin.createLocation`
   - **Authentication**: This endpoint requires an authenticated admin user. In Insomnia, you will need to set the Auth type to 'Bearer Token' and provide the token received upon admin login.
   - **Headers Example**:
     - **Authorization**: Set this header with the value `<YOUR_ADMIN_TOKEN>`, replacing `<YOUR_ADMIN_TOKEN>` with the actual bearer token you have obtained.
   - **Payload Example**:
   ```json
   {
     "json": {
       "latitude": 58.2554,
       "longitude": 22.4890,
       "address": "Your address here"
     }
   }
   ```
   - **Description**: This POST endpoint allows administrators to add a new location. The request must include a JSON payload with latitude, longitude, and address fields. It requires a bearer token in the authorization header to ensure secure admin-level access.

8. **Admin Update Location**:
   - **Procedure**: `bookings.admin.updateLocation`
   - **Endpoint**: `POST http://localhost:3000/v1/trpc/bookings.admin.updateLocation`
   - **Payload Example**:
   ```json
   {
     "json": {
       "id": 1,
       "latitude": 59.2554,
       "longitude": 22.4890,
       "address": "Updated address here"
     }
   }
   ```
   - **Description**: This endpoint is used by administrators to update the details of an existing location. The request must include a JSON payload with the location's id, latitude, longitude, and address. Proper authorization with a bearer token is required to perform this action.

9. **Admin Feedback Edit**:
   - **Procedure**: `feedback.admin.adminEdit`
   - **Endpoint**: `POST http://localhost:3000/v1/trpc/feedback.admin.adminEdit`
   - **Authentication**: To access this endpoint, authentication is required. In Insomnia, select 'Bearer Token' as the Auth type and enter the token provided upon admin login. 
   - **Headers Example**:
     - **Authorization**: In the Headers section, create a new header with the key `Authorization` and the value `Bearer <YOUR_ADMIN_TOKEN>`, replacing `<YOUR_ADMIN_TOKEN>` with the actual bearer token you received from the authentication response.
   - **Description**: This POST endpoint allows administrators to edit feedback details.

10. **Admin Feedback Delete**:
   - **Procedure**: `feedback.admin.adminDelete`
   - **Endpoint**: `POST http://localhost:3000/v1/trpc/feedback.admin.adminDelete`
   - **Authentication**: To access this endpoint, authentication is required. In Insomnia, select 'Bearer Token' as the Auth type and enter the token provided upon admin login. 
   - **Headers Example**:
     - **Authorization**: In the Headers section, create a new header with the key `Authorization` and the value `Bearer <YOUR_ADMIN_TOKEN>`, replacing `<YOUR_ADMIN_TOKEN>` with the actual bearer token you received from the authentication response.
   - **Description**: This POST endpoint is used by administrators to remove feedback entries.


### Using Migration to Create an Admin User

Set the admin password in .env file. Run migration file for creating admin.

`npm run migration:run`


After creating an admin account you can perform the following steps: (currently under construction)

1. Use the admin username and password to log in using admin URL.
2. Retrieve the bearer token provided in the login response.
3. Use this token for authorization when making requests to admin-specific endpoints as previously described in the "Admin Booking View" section.


### Testing payment

Use following card data:

 - Card number: 4242 4242 4242 4242
 - Valid future date: like 12/34
 - Any three-digit CVC: like 123
 - Any five-digit area code: like 12345

