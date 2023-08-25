import React,{useEffect, useState} from "react";
import {listTables, readReservation, seatReservation} from "../../utils/api"
import ErrorAlert from "../ErrorAlert";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


function SeatTable() {
    const blankTable = { table_id: "" };
    const [form, setForm] = useState(blankTable);
    const [res, setRes] = useState({ people: 0 });
    const [displayError, setDisplayError] = useState(null);
    const [tables, setTables] = useState([]);
    const { reservation_id } = useParams();
    const abortController = new AbortController();
    const history = useHistory();
  
    useEffect(() => {
      const abort = new AbortController();
      const initialForm = { table: "" };
      setForm(initialForm);
  
      async function getReservation() {
        try {
          const response = await readReservation(reservation_id, abort.signal);
          setRes(response);
        } catch (error) {
          if (error.name !== "AbortError") setDisplayError(error);
        }
      }
  
      async function getTables() {
        try {
          const response = await listTables(abort.signal);
          setTables(response);
        } catch (error) {
          if (error.name !== "AbortError") setDisplayError(error);
        }
      }
  
      getReservation();
      getTables();
  
      return () => abort.abort();
    }, [reservation_id]);
  
    function changeHandler({ target }) {
      setForm({ ...form, [target.name]: target.value });
    }
  
    async function submitHandler(e) {
      e.preventDefault();
      const table_id = Number(form.table_id);
      const reservation = parseInt(reservation_id);
      setDisplayError(null);
      setForm(blankTable);
  
      try {
        await seatReservation(reservation, table_id, abortController.signal);
        history.push("/dashboard");
      } catch (error) {
        if (error.name !== "AbortError") setDisplayError(error);
      }
      return () => abortController.abort();
    }
  
    const tableOptions = tables.map((table) => {
      const disabled = Number(table.capacity) < Number(reservation.people);
      return (
        <option key={table.table_id} value={table.table_id} disabled={disabled}>
          {table.table_name} - {table.capacity}
        </option>
      );
    });
  
    return (
      <div className="container fluid my-3">
        <ErrorAlert error={displayError} />
        <form className=" d-flex flex-column" onSubmit={submitHandler}>
          <label htmlFor="table_id">
            Choose Table:
            <select className="form-control" name="table_id" onChange={changeHandler}>
              <option>Choose Table:</option>
              {tableOptions}
            </select>
          </label>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => history.goBack()}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
  
  export default SeatTable;