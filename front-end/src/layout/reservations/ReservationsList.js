import React, { useState } from "react";
import { updateStatus } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function ReservationList({ reservation }) {
  const [displayError, setDisplayError] = useState(null);

  async function cancelHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    const message =
      "Cancel cannot be undone.  Are you sure you want to cancel?";

    if (window.confirm(message)) {
      try {
        await updateStatus(
          reservation.reservation_id,
          "cancelled",
          abortController.signal
        );
        window.location.reload(true);
      } catch (error) {
        if (error.name !== "AbortError") setDisplayError(error);
      }
    }
  }
  return(
    <div className="border d-flex flex-column align-items-center p-2">
        <p data-reservation-id-status={reservation.reservation_id}>
            {reservation.status}
        </p>
        <p>Name: {reservation.first_name} {reservation.last_name}</p>
        <p>Phone Number: {reservation.mobile_number}</p>
        <p>Number in Party: {reservation.people}</p>
        <p>When: {reservation.reservation_date} @ {reservation.reservation_time}</p>
       <div>
    <ErrorAlert error={displayError}/>
    {reservation.status === "booked"? (
        <button className="btn btn-primary my-2 mr-3 px-3 px-2">
            <a href={`/reservations/${reservation.reservation_id}/seat`} style={{color:" white"}}>Seat</a>
        </button>
    ):null}
    <button className="btn btn-teal px-3 py-3">
        <a href={`/reservations/${reservation.reservation_id}/edit`} style={{color: "black", textDecoration: "none"}}>Edit Res.</a>
    </button>
    <button className="btn btn-danger mx-3 px-3 my-3"
    data-reservation-id-cancel={reservation.reservation_id}
    onclick={cancelHandler}>
        Cancel
    </button>
     </div>
    </div>
  )
}

export default ReservationList;
