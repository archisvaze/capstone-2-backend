const express = require("express");
const pool = require("../db_config");

const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


let router = express.Router();

//create a new consulation 
router.post("/", async (req, res) => {
    let { doctor_id, patient_id, date, time } = req.body;
    try {
        //check if patient has any other consultations at the same time
        const existingConsultations = await pool.query(
            `SELECT * FROM consultations WHERE patient_id = $1 AND time = $2 AND date = $3 AND status = $4`, [patient_id, time, date, false]
        );

        //get cost for doctor
        const doctor = await pool.query(
            `SELECT * FROM doctors WHERE doctor_id = $1`, [doctor_id]
        );

        let cost = doctor.rows[0].cost;

        let newDate = new Date(date);
        let day = allDays[newDate.getDay()];

        if (existingConsultations.rows.length <= 0) {
            console.log("No concurrent consultations found for patient on the same day/time");

            if (!(doctor.rows[0].days.includes(day))) {
                return res.status(400).json({ error: `Doctor does not do consultations on ${day}. Please choose another day.` })
            }

            const newConsultation = await pool.query(
                `INSERT INTO "consultations" ("doctor_id", "patient_id", "date", "time", "status", "cost") VALUES ($1, $2, $3, $4, $5, $6)`, [doctor_id, patient_id, date, time, false, cost]
            );
            return res.status(200).json({ message: "Consultation Booked!" })
        } else {
            return res.status(400).json({ error: "Concurrent Consultation. You already have a consultation booked at during this time" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// get all patients' consultations by id
router.get("/patient/:id", async (req, res) => {
    try {

        let existingConsultations = await pool.query(
            `SELECT * FROM consultations WHERE patient_id = $1`, [req.params.id]
        );
        if (existingConsultations.rows.length <= 0) {
            //no consultations
            return res.status(200).json([])
        }
        let consultations = JSON.parse(JSON.stringify(existingConsultations.rows));

        for (let consulation of consultations) {
            //get doctors data
            let doctor = await pool.query(`SELECT * FROM doctors WHERE doctor_id = $1`, [consulation.doctor_id]);

            consulation.doctor = doctor.rows[0];
        }

        return res.status(200).json(consultations)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


// get all doctors' consultations by id
router.get("/doctor/:id", async (req, res) => {
    try {

        let existingConsultations = await pool.query(
            `SELECT * FROM consultations WHERE doctor_id = $1`, [req.params.id]
        );
        if (existingConsultations.rows.length <= 0) {
            //no consultations
            return res.status(200).json([])
        }
        let consultations = JSON.parse(JSON.stringify(existingConsultations.rows));

        for (let consulation of consultations) {
            //get patients data
            let patient = await pool.query(`SELECT * FROM patients WHERE patient_id = $1`, [consulation.patient_id]);
            consulation.patient = patient.rows[0];
        }

        return res.status(200).json(consultations)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


//update a consultation from doctors POV by consultation id
router.post("/doctor/:id", async (req, res) => {
    let { notes } = req.body;
    try {
        const existingConsultations = await pool.query(
            `SELECT * FROM consultations WHERE _id = $1`, [req.params.id]
        )
        if (existingConsultations.rows.length <= 0) {
            return res.status(400).json({ error: "Incorrect Consultation ID or consultation does not exist" })
        }
        let updateConsultation = await pool.query(
            `UPDATE consultations SET notes = $1, status = $3 WHERE _id = $2`, [notes, req.params.id, true]
        )

        return res.status(200).json({ message: "Consultation updated with note" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


//update a consultation from patients POV by consultation id
router.post("/patient/:id", async (req, res) => {
    let { review, rating } = req.body;
    try {

        let consultation = await pool.query(
            `SELECT * FROM consultations WHERE _id = $1`, [req.params.id]
        );
        if (consultation.rows.length <= 0) {
            return res.status(400).json({ error: "Incorrect Consultation ID or consultation does not exist" })
        }
        if (consultation.rows[0].status === false) {
            console.log("consultation is not marked complete by doctor");
            return res.status(400).json({ error: "Consultation is not marked DONE by Doctor" })
        }

        if (consultation.rows[0].rating !== null) {
            console.log("Already rated");
            return res.status(400).json({ error: "You have already rated this consultations" })
        }

        const updateConsultation = await pool.query(
            `UPDATE consultations SET review = $1, rating = $2 WHERE _id = $3`, [review, rating, req.params.id]
        )

        //update doctors rating;
        let doctorsID = consultation.rows[0].doctor_id;

        let existingDoctor = await pool.query(
            `SELECT * FROM doctors WHERE doctor_id = $1`, [doctorsID]
        );

        let currRating = existingDoctor.rows[0].rating;
        if (currRating === null) {
            const updatedDoctor = await pool.query(
                `UPDATE doctors SET rating = $1 WHERE doctor_id = $2`, [rating, doctorsID]
            )
        }
        else {
            //get total number of consultations by doctor and calculate rating

            const doctorsConsultations = await pool.query(
                `SELECT * FROM consultations WHERE doctor_id = $1`, [doctorsID]
            );
            let totalratings = doctorsConsultations.rows.length;
            console.log(totalratings)
            let newRating = currRating + rating / totalratings;

            const updatedDoctor = await pool.query(
                `UPDATE doctors SET rating = $1 WHERE doctor_id = $2`, [newRating, doctorsID]
            )
        }
        return res.status(200).json({ message: "Consultation updated with review and rating" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


//delete a consultation
router.delete("/:id", async (req, res) => {
    try {

        const existingConsultation = await pool.query(
            `DELETE FROM consultations WHERE _id = $1`, [req.params.id]
        )
        return res.status(200).json({ message: "Consultation was cancelled" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})




module.exports = router;