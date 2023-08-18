const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


const date = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const time = /[0-9]{2}:[0-9]{2}/;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const validProps =[
  "first_name", "last_name","mobile_number","people","reservation_date","reservation_time"
]

const statuses = ["booked", "canceled", "finished", "seated"]


async function list(req, res) {
  const { date, mobile_number } = req.query;
  let reservations;
  if (date) {
    reservations = await service.listByDate(date);
  } else if (mobile_number) {
    reservations = await service.listByNumber(mobile_number);
  }

  res.json({ data: reservations });
}
async function create(req, res){
  const reservation = await service.create(req.body.data)
  res.status(201).json({data: reservation})
}

function hasValidProps(req, res, next){
  const {data= {}} = req.body
  if(!data){
    return next({
      status: 400, message: "Requires data"
    })
  }
  validProps.forEach((property) => {
    if (!data[property]) {
      return next({
        status: 400,
        message: `requires ${property}`,
      });
    }

    if (property === "people" && !Number.isInteger(data.people)) {
      return next({
        status: 400,
        message: `requires ${property} to be a number`,
      });
    }

    if (
      property === "reservation_date" &&
      !date.test(data.reservation_date)
    ) {
      return next({
        status: 400,
        message: `requires ${property} to be properly formatted as YYYY-MM-DD`,
      });
    }

    if (
      property === "reservation_time" &&
      !time.test(data.reservation_time)
    ) {
      return next({
        status: 400,
        message: `requires ${property} to be properly formatted as HH:MM`,
      });
    }
  });

  next();

}

function isReserved(req, res, next){
  const {data} = req.body
  if(data.status === "finished" || data.status ==="seated"){
    return next({
      status: 400, message: "Reservations cannot be made with seated or finished status"
    })
  }
  next()
}

function isValidDay(req, res, next) {
  const { data } = req.body;
  const reservationDate = new Date(
    `${data.reservation_date} ${data.reservation_time}`
  );
  let day = days[reservationDate.getDay()];
  let time = data.reservation_time;
  if (reservationDate < new Date() && day === "Tuesday") {
    return next({
      status: 400,
      message:
        "Reservations can only be created on a future date, excluding Tuesdays",
    });
  }
  if (reservationDate < new Date()) {
    return next({
      status: 400,
      message: "Reservations can only be created on a future date",
    });
  }
  if (day === "Tuesday") {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays",
    });
  }
  if (time <= "10:30" || time >= "21:30") {
    return next({
      status: 400,
      message: "Reservations can only be made from 10:30AM - 9:30PM.",
    });
  }
  next();
}

function validStatus(req, res, next){
  const {status} = req.body.data
  if(statuses.includes(status)){
   status =res.locals.status  
   next()
  } else {
    next({
      status: 400, message: "Status not accepted.  Status must be: 'booked', 'seated', or 'finished."
    })
  }
}

async function reservationExists(req, res, next){
  const {reservation_id}= req.params
  const reservation = await service.read(reservation_id)
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }
  next({
    status:404, message: `Reservation ${reservation_id? reservation_id: ""} Not Found`
  })
}

function unfinished(req, res, next){
  const {reservation_id} = req.params
  const status = res.locals.reservation.status

  if(status === "finished"){
    return next({
      status: 400, message: `This reservation ${reservation_id} is in the past.  We cannot time travel in 2035!`
    })
  }
  next()
 }


async function update(req, res, next) {
  const updated = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  service.updateReservation(updated)
    .then((data) => res.json({ data }))
    .catch(next);
} 

async function changeStatus(req, res, next){
  const changed = {...req.body.data,
  reservation_id: res.locals.reservation.reservation_id
}
service.update(changed)
.then((data)=>res.json({data})).catch(next)

}



function read(req, res) {
  res.json({ data: res.locals.reservation });
}







module.exports = {
  create: [
hasValidProps, 
isValidDay,
isReserved, 
asyncErrorBoundary(create),
],
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  update: [asyncErrorBoundary(update),
  asyncErrorBoundary(reservationExists),
hasValidProps,
],

update: [asyncErrorBoundary(reservationExists),
hasValidProps,
asyncErrorBoundary(update)],
changeStatus: [
  asyncErrorBoundary(reservationExists),
  validStatus,
  unfinished,
  asyncErrorBoundary(changeStatus),
],

};
