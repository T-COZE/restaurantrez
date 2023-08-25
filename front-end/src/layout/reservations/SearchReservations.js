import React, { useEffect, useState } from "react";
import ReservationList from "./ReservationsList";
import { listReservations } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";


function SearchReservations(){
    const initial = {
        mobile_number: "",
    }
    const [form, setForm] = useState(initial)
    const [reservations, setReservations] = useState([])
    const [displayError, setDisplayError] = useState(null)

    useEffect(()=>{
        const initialForm = {
            mobile_number:""
        }
        setForm(initialForm)
        setReservations([])
    }, [])

    function changeHandler({target}){
        setForm({...form, [target.name]:target.value})
    }
    async function submitHandler (e){
        e.preventDefault()
        const abortController = new AbortController()
        const searchParams = {
            mobile_number: form.mobile_number
        }
        setForm(initial)
        setDisplayError(null)

        listReservations(searchParams, abortController.signal)
        .then((response)=>{
            setReservations(response)
        })
        .catch((error)=>{
            if(error.name !== "AbortError") setDisplayError(error)
        })
    return ()=> abortController.abort()
    }

    const searchResults= reservations.length > 0 ? 
    reservations.map((reservation)=>(
        <ReservationList key ={reservation.reservation_id} reservation={ reservation}/>
    )) : "No Reservation Matches"
    return (
    <div>
        <p className="h2 text-center">Search for Reservation by Mobile Number</p>
      <form className="d-flex flex-column my-4" onSubmit={submitHandler}>
        <label htmlFor="mobile_number">
          Enter Mobile Number (partial or complete):
          <input
            className="form-control my-2"
            name="mobile_number"
            type="tel"
            onChange={changeHandler}
          />
        </label>
        <button className="btn btn-info" type="submit">
          Find
        </button>
      </form>
      <ErrorAlert error={displayError} />
      <div className="text-center">{searchResults}</div>

    </div>
    )
}

export default SearchReservations;