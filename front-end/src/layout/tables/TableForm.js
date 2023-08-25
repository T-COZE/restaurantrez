import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function TablesForm() {
  const initial = {
    capacity: 0,
    table_name: "",
  };
  const [form, setForm] = useState(initial);
  const [displayError, setDisplayError] = useState(false);
  const abortController = new AbortController();
  const history = useHistory();

  useEffect(() => {
    const initialForm = {
      capacity: 0,
      table_name: "",
    };
    setForm(initialForm);
  }, []);

  function changeHandler({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function submitHandler(event) {
    event.preventDefault();
    const newTable = {
      capacity: Number(form.capacity),
      table_name: form.table_name,
    };
    setDisplayError(false);
    try {
      await createTable(newTable, abortController.signal);
      setForm(initial);
      history.push("/dashboard");
    } catch (error) {
      setDisplayError(error);
    }
    return () => abortController.abort();
  }

  return (
    <div className="container fluid mt-3">
      <ErrorAlert className="alert alert-danger" error={displayError} />
      <form className="d-flex flex-column" onSubmit={submitHandler}>
        <label htmlFor="table_name">
          Table Name:
          <input
            className="form-control my-2"
            name="table_name"
            type="text"
            min={2}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="capacity">
          Table Capacity:
          <input
            className="form-control my-2"
            name="capacity"
            type="number"
            onChange={changeHandler}
          />
        </label>
        <div className="d-flex justify-content-around m-3">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TablesForm;