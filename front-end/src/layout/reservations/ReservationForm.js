import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ form, submitHandler, changeHandler }) {
  const history = useHistory;
  return (
    <form className="d-flex flex-column" onSubmit={submitHandler}>
      <label htmlFor="first_name">
        First Name:
        <input
          className="first_name"
          name="first_name"
          type="text"
          placeholder="First"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="last_name">
        Last Name:
        <input
          className="last_name"
          placeholder="Last"
          name="last_name"
          type="text"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="mobile_number">
        Mobile Number:
        <input
          type="text"
          className="mobile_number"
          placeholder="(***)-***-****"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="reservation_date">
        Reservation Date:
        <input
          className="reservation_date"
          type="date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="reservation_time">
        Reservation Time:
        <input
          type="time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="people">
        Party Size:
        <input
          className="party_size"
          type="number"
          min={1}
          placeholder="minimum 1"
          onChange={changeHandler}
        />
      </label>
      {/* Time of reservation:
Number of people in the party, which must be at least 1 person.
display a Submit button that, when clicked, saves the new reservation, then displays the /dashboard page for the date of the new reservation
display a Cancel button that, when clicked, returns the user to the previous page
display any error messages returned from the API */}
      <div>
        <button className="btn btn-success" type="submit">
          Submit
        </button>
        <button className="btn btn-danger" onClick={() => history.goBack()}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
