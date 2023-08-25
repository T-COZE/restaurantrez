import React, { useState } from "react";
import { openTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function TableList({ table }) {
  const { capacity, reservation_id, table_id, table_name } = table;

  const [displayError, setDisplayError] = useState(null);

  async function handleClick(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const message =
      "Is this table ready? This cannot be undone.";
    setDisplayError(null);
    if (window.confirm(message)) {
      try {
        await openTable(table_id, abortController.signal);
        window.location.reload(true);
      } catch (error) {
        if (error.name !== "AbortError") setDisplayError(error);
      }
      return () => abortController.abort();
    }
  }

  const buttonSet = reservation_id ? (
    <div className="d-flex justify-content-center m-3">
      <button
        className="btn btn-danger"
        data-table-id-finish={table_id}
        onClick={handleClick}
      >
        Finish
      </button>
    </div>
  ) : (
    <></>
  );

  return (
    <div className="border container fluid my-3">
      <ErrorAlert error={displayError} />
      <p className="h5 text-center">Table: {table_name}</p>
      <p className="h6 text-center">Capacity: {capacity}</p>
      <p className="h4 m-3 text-center" data-table-id-status={table_id}>
        {reservation_id ? "Occupied" : "Open"}
      </p>
      {buttonSet}
    </div>
  );
}

export default TableList;