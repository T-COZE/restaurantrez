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
         className="form-control my-2"
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
          className="form-control my-2"
          placeholder="(***)-***-****"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="reservation_date">
        Reservation Date:
        <input
          className="form-control my-2"
          type="date"
          name="reservation_date"
          value={form.reservation_date}
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="reservation_time">
        Reservation Time:
        <input
            className="form-control my-2"
          type="time"
          name="reservation_time"
          value={form.reservation_time}
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="people">
        Party Size:
        <input
          className="form-control my-2"
          name="people"
          value={form["people"]}
          min={1}
          placeholder={1}
          type="number"
          onChange={changeHandler}
          />
      </label>
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
