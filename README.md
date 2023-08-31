Restaurant Reservation System
This repository contains the source code and documentation for a restaurant reservation system. The system allows restaurant managers to create, manage, and modify reservations, as well as seat customers at specific tables. The system is designed to provide a user-friendly interface for both restaurant staff and customers.

User Stories
US-01 Create and List Reservations
As a restaurant manager, I want to create a new reservation when a customer calls, so that I know how many customers will arrive at the restaurant on a given day.

Acceptance Criteria

The /reservations/new page will have the following required and not-nullable fields:
First name: <input name="first_name" />
Last name: <input name="last_name" />
Mobile number: <input name="mobile_number" />
Date of reservation: <input name="reservation_date" />
Time of reservation: <input name="reservation_time" />
Number of people in the party, which must be at least 1 person: <input name="people" />
Display a Submit button that, when clicked, saves the new reservation and displays the /dashboard page for the date of the new reservation.
Display a Cancel button that, when clicked, returns the user to the previous page.
Display any error messages returned from the API.
US-02 Create Reservation on a Future, Working Date
As a restaurant manager, I only want to allow reservations to be created on a day when we are open, so that users do not accidentally create a reservation for days when we are closed.

Acceptance Criteria

The /reservations/new page will display an error message with className="alert alert-danger" if any of the following constraints are violated:
The reservation date is a Tuesday as the restaurant is closed on Tuesdays.
The reservation date is in the past. Only future reservations are allowed.
US-03 Create Reservation within Eligible Timeframe
As a restaurant manager, I only want to allow reservations to be created during business hours, up to 60 minutes before closing, so that users do not accidentally create a reservation for a time we cannot accommodate.

Acceptance Criteria

The /reservations/new page will display an error message with className="alert alert-danger" if any of the following additional constraints are violated:
The reservation time is before 10:30 AM.
The reservation time is after 9:30 PM.
The reservation date and time combination is in the past. Only future reservations are allowed.
US-04 Seat Reservation
As a restaurant manager, when a customer with an existing reservation arrives at the restaurant, I want to seat (assign) their reservation to a specific table, so that I know which tables are occupied and free.

Acceptance Criteria

The /tables/new page will have the following required and not-nullable fields:
Table name: <input name="table_name" />, which must be at least 2 characters long.
Capacity: <input name="capacity" />, the number of people that can be seated at the table, which must be at least 1 person.
Display a Submit button that, when clicked, saves the new table and displays the /dashboard page.
Display a Cancel button that, when clicked, returns the user to the previous page.
US-05 Finish an Occupied Table
As a restaurant manager, I want to free up an occupied table when the guests leave, so that I can seat new guests at that table.

Acceptance Criteria

Display a "Finish" button on each occupied table on the /dashboard page.
Clicking the "Finish" button will display a confirmation message. If the user selects "Ok":
Send a DELETE request to remove the table assignment.
Refresh the list of tables to show that the table is now available.
US-06 Reservation Status
As a restaurant manager, I want a reservation to have a status of either booked, seated, or finished, so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

Acceptance Criteria

Display the status of the reservation on the /dashboard page. The default status is "booked".
Display the Seat button only when the reservation status is "booked".
Clicking the Seat button changes the status to "seated" and hides the Seat button.
Clicking the Finish button associated with the table changes the reservation status to "finished" and removes the reservation from the dashboard.
US-07 Search for a Reservation by Phone Number
As a restaurant manager, I want to search for a reservation by phone number (partial or complete), so that I can quickly access a customer's reservation when they call about their reservation.

Acceptance Criteria

The /search page will display a search box <input name="mobile_number" /> with the placeholder text: "Enter a customer's phone number".
Display a "Find" button next to the search box.
Clicking the "Find" button will submit a request to the server to search for reservations matching the phone number.
Display all matched records on the /search page using the same reservations list component as the /dashboard page.
Display No reservations found if there are no records found after clicking the Find button.
US-08 Change an Existing Reservation
As a restaurant manager, I want to be able to modify a reservation if a customer calls to change or cancel their reservation, so that reservations are accurate and current.

Acceptance Criteria

Display an "Edit" button next to each reservation on the /dashboard and /search pages.
Clicking the "Edit" button will navigate the user to the /reservations/:reservation_id/edit page.
Display a "Cancel" button next to each reservation.
Clicking the "Cancel" button will display a confirmation message. If the user selects "Ok":
Set the reservation status to "cancelled" using a PUT request.
Refresh the results on the page.
The /reservations/:reservation_id/edit page will display the reservation form with existing data filled in.
Only reservations with a status of "booked" can be edited.
Clicking the "Submit" button will save the reservation and display the previous page.
Clicking "Cancel" makes no changes and returns the user to the previous page.
Getting Started
To run the restaurant reservation system locally, follow these steps:

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: PostgreSQL
Testing: Jest, Supertest
Acknowledgements
This restaurant reservation system was created as part of a coding project. It follows the user stories and acceptance criteria outlined above. If you have any questions or feedback, please feel free to contact us.

