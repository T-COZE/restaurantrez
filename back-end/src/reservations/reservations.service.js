const knex = require("../db/connection")
const table = "reservations"

async function create(reservation){
    return knex(table)
    .insert(reservation).returning("*").then((created)=>
    created[0])
}
async function listByNumber(mobile_number){
    return knex(table)
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date")
}

async function listByDate(reservation_date) {
    return knex(table).select("*").where({ reservation_date }).orderBy("reservation_time");
  }
// whereNot({ status: "finished" })
//       .whereNot({ status: "cancelled" })
async function read(reservation_id){
    return knex(table).select("*").where({reservation_id}).first()
}
async function update(reservation){
    return knex(table).where({reservation_id: reservation_id}).update(reservation,"*")
    .then((updated) => updated[0])
}
async function newStatus(reservation_id, status){
    return knex(table).where({reservation_id}).update({status}, "*").then((updated)=> updated[0])
}
async function updateReservation(updatedData) {
    const { reservation_id, ...restOfData } = updatedData;
  
    return knex(table).where({ reservation_id })
      .update(restOfData).returning('*')
  }

module.exports = {
    create,
    listByNumber,
    listByDate,
    read,
    update,
    updateReservation,
    newStatus,
}