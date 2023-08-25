import React, {useState} from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";



function NewReservation(){
    const formData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        people: 0,
        reservation_date: "",
        reservation_time: "",
        status: "",
      };
       const [form, setForm]= useState({...formData})
       const [displayError, setDisplayError] = useState(false)
       const abortController = new AbortController()
       const history = useHistory()

       function formatDate(date) {
        let formattedDate = date.split("");
        formattedDate.splice(10);
        formattedDate = formattedDate.join("");
        return formattedDate;
      }

      function formatTime(time){
        let formattedTime = time.split("")
        formattedTime.splice(10)
        formattedTime = formattedTime.join("")
        return formattedTime
      }
      const formatters = {
        people:parseInt, reservation_date: formatDate, reservation_time:formatTime
      }

      function changeHandler({ target }) {
        const { name, value } = target;
        const formatter = formatters[name] || ((value) => value);
        
        setForm({ ...form, [name]: formatter(value) });
      }
      async function submitHandler(e){
        e.preventDefault()
        setDisplayError(false)
        const newReservation = {
            first_name: form.first_name,
            last_name: form.last_name,
            mobile_number: form.mobile_number,
            people: Number(form.people),
            reservation_date: form.reservation_date,
            reservation_time: form.reservation_time,
            status: "booked",
        } 
        try {
            await createReservation(newReservation, abortController.signal)
            setForm(formData)
            history.push(`/dashboard?date=${newReservation.reservation_date}`)
        }catch(error){
            if(error.name==="AbortError")setDisplayError(error)
        }
        return () => {
            abortController.abort()
        }
      }

    return (
    <div>
        <h3 className="newResTitle ">
        New Reservation Form
        </h3>
            <ReservationForm form={form} submitHandler={submitHandler} changeHandler={changeHandler} />
    </div>
    )
    }
export default NewReservation;


