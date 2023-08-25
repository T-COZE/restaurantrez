import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";


function EditReservation(){
    const formData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        people: 0,
        reservation_date: "",
        reservation_time: "",
        status: "",
    }

    const [form, setForm] = useState({...formData})
    const [displayError, setDisplayError] = useState(false)
    const abortController = new AbortController()
    const history = useHistory()
    const {reservation_id} = useParams()
    const resId = parseInt(reservation_id)

    useEffect(()=>{
        const abort = new AbortController()
        const blankRes = {
            first_name: "",
            last_name: "",
            mobile_number: "",
            people: 0,
            reservation_id: "",
            reservation_date: "",
            reservation_time: "",
            status: "",
        }

        async function pullRes(){
            readReservation(resId, abort.signal)
            .then((response)=>{
                blankRes.first_name= response.first_name
                blankRes.last_name=response.last_name
                blankRes.mobile_number=response.mobile_number
                blankRes.people= parseInt(response.people)
                blankRes.reservation_id= parseInt(response.reservation_id)
                blankRes.reservation_date= formatDate(response.reservation_date)
                blankRes.reservation_time= formatTime(response.reservation_time)
                blankRes.status= response.status

                setForm({...blankRes})
            })
            .catch((error)=> {
                if(error.name !== "AbortError") setDisplayError(error)
            })
        return ()=> abort.abort()
        }
        useEffect(()=>{ pullRes()}, [resId])
    })

    function formatDate(date) {
        let formattedDate = date.split("");
        formattedDate.splice(10);
        formattedDate = formattedDate.join("");
        return formattedDate;
      }
      function formatTime(time) {
        let formattedTime = time.split("");
        formattedTime.splice(5);
        formattedTime = formattedTime.join("");
        return formattedTime;
      }

      async function submitHandler(e){
        e.preventDefault()
        setDisplayError(false)
        const updatedReservation ={
            first_name: form.first_name,
      last_name: form.last_name,
      mobile_number: form.mobile_number,
      people: Number(form.people),
      reservation_id: resId,
      reservation_date: form.reservation_date,
      reservation_time: form.reservation_time,
      status: "booked",
     }
     updateReservation(updatedReservation, abortController.signal)
     .then(()=>{
        history.push(`/dashboard?date=${updatedReservation.reservation_date}`)
     })
     .catch((error)=>{
        if(error.name !==" AbortError") setDisplayError(error)
     })
    return ()=>{
        abortController.abort()
    }
 }

    
    return (
    <div>
        <h3 className="text-center my-3">Create New Reservation</h3>
        <ErrorAlert />
        <ReservationForm 
        form={form} changeHandler={changeHandler} submitHandler={submitHandler}
        />

    </div>
    )
}

export default EditReservation;